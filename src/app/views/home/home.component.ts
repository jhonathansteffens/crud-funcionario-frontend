import { FuncionarioService } from './../../services/FuncionarioService';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Funcionario } from 'src/app/models/Funcionario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FuncionarioService]
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'email', 'nis', 'actions'];
  dataSource!: Funcionario[];
  updateItem!: Funcionario | undefined;

  constructor(
    public dialog: MatDialog,
    public funcionarioService: FuncionarioService) {
      this.funcionarioService.getFuncionarios()
      .subscribe((data: Funcionario[]) => {
        this.dataSource = data;
      })
    }

ngOnInit(): void {

}

openDialog(element: Funcionario | null): void {
  const dialogRef = this.dialog.open(ElementDialogComponent, {
    width: '400px',
    data: element === null ? {
      id: null,
      nome: null,
      sobrenome: null,
      email: null,
      nis: null
    } : {
      id: element.id,
      nome: element.nome,
      sobrenome: element.sobrenome,
      email: element.email,
      nis: element.nis
    }
  });

 dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.funcionarioService.editFuncionario(result)
          .subscribe((data: Funcionario) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          })
        } else {
          this.funcionarioService.createFuncionario(result)
            .subscribe((data: Funcionario) => {
              this.dataSource.push(data);
              this.table.renderRows();
            })
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.funcionarioService.deleteFuncionario(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      })
  }

  editElement(element :Funcionario): void {
    this.openDialog(element);
  }
}

