// src/app/components/especie/especie.component.ts
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Especie } from 'src/app/models/especie';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { NgFor, NgIf } from '@angular/common';
import { Raza } from 'src/app/models/raza';
import { RazaService } from 'src/app/services/raza.service';
import { MatPaginator } from '@angular/material/paginator';
import { EspecieService } from 'src/app/services/especie.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  templateUrl: './razas.component.html',
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
    NgIf, NgFor,
    MatDialogModule,
    MatSelectModule
  ]
})
export class RazaComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'nombre', 'especie', 'acciones'];
    dataSource = new MatTableDataSource<Raza>();
    especies: Especie[] = [];
    
    form: FormGroup;
    editando = false;
    cargando = false;
    guardando = false;
    
    @ViewChild('formDialog') formDialog!: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    private razaService: RazaService,
    private especieService: EspecieService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
        this.form = this.fb.group({
            id: [0],
            nombre: ['', Validators.required],
            especieId: [null, Validators.required]
        });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.cargarEspecies();
        this.recargar();
    }

    cargarEspecies() {
        this.especieService.getAll().subscribe(res => (this.especies = res.data));
    }

    recargar() {
        this.cargando = true;
        this.razaService.getAll().subscribe({
            next: res => {
                this.dataSource.data = res.data;
                this.cargando = false;
            },
            error: () => (this.cargando = false)
        });
    }

    abrirDialogo(raza?: Raza) {
        this.editando = !!raza;
        this.form.reset();
        if (raza) this.form.patchValue(raza);

        this.dialog.open(this.formDialog, {
            width: '300px'
        });
    }

    guardar() {
        if (this.form.invalid) return;

        const raza = this.form.value as Raza;
        const obs = this.editando
            ? this.razaService.update(raza)
            : this.razaService.add(raza);

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
        this.razaService.delete(id).subscribe(() => this.recargar());
    }
}
