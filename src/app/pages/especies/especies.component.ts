// src/app/components/especie/especie.component.ts
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EspecieService } from 'src/app/services/especie.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especie } from 'src/app/models/especie';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: './especies.component.html',
  styleUrls: ['../base.scss'],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatDialogModule
  ]
})
export class EspecieComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'nombre', 'acciones'];
    dataSource = new MatTableDataSource<Especie>();

    form: FormGroup;
    editando = false;
    cargando = false;
    guardando = false;

    @ViewChild('formDialog') formDialog!: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private especieService: EspecieService,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) {
        this.form = this.fb.group({
        id: [0],
        nombre: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.recargar();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    recargar() {
        this.cargando = true;
        this.especieService.getAll().subscribe({
        next: res => {
            this.dataSource.data = res.data;
            this.cargando = false;
        },
        error: () => (this.cargando = false)
        });
    }

    abrirDialogo(especie?: Especie) {
        this.editando = !!especie;
        this.form.reset();
        if (especie) this.form.patchValue(especie);

        this.dialog.open(this.formDialog, {
        width: '300px'
        });
    }

    guardar() {
        if (this.form.invalid) return;

        const especie = this.form.value as Especie;
        const obs = this.editando
        ? this.especieService.update(especie)
        : this.especieService.add(especie);

        this.guardando = true;

        obs.subscribe({
        next: () => {
            this.recargar();
            this.dialog.closeAll();
            this.guardando = false;
        },
        error: () => {
            this.guardando = false;
        }
        });
    }

    eliminar(id: number) {
        this.especieService.delete(id).subscribe(() => this.recargar());
    }
}

