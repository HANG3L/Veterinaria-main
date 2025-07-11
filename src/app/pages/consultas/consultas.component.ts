import { NgFor, NgIf } from "@angular/common";
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MaterialModule } from "src/app/material.module";
import { Consulta } from "src/app/models/consulta";
import { Paciente } from "src/app/models/paciente";
import { ConsultaService } from "src/app/services/consulta.service";
import { PacienteService } from "src/app/services/paciente.service";

@Component({
  templateUrl: './consultas.component.html',
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
export class ConsultaComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'motivo', 'paciente', 'raza', 'fecha', 'acciones'];
    dataSource = new MatTableDataSource<Consulta>();
    pacientes: Paciente[] = [];
    
    form: FormGroup;
    editando = false;
    cargando = false;
    guardando = false;
    
    @ViewChild('formDialog') formDialog!: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
        this.form = this.fb.group({
            id: [0],
            pacienteId: [null, Validators.required],
            motivo: ['', Validators.required],
            observaciones: ['', Validators.required]
        });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.cargarPacientes();
        this.recargar();
    }

    cargarPacientes() {
        this.pacienteService.getAll().subscribe(res => (this.pacientes = res.data));
    }

    recargar() {
        this.cargando = true;
        this.consultaService.getAll().subscribe({
            next: res => {
                this.dataSource.data = res.data;
                this.cargando = false;
            },
            error: () => (this.cargando = false)
        });
    }

    abrirDialogo(consulta?: Consulta) {
        this.editando = !!consulta;
        this.form.reset();
        if (consulta) this.form.patchValue(consulta);

        this.dialog.open(this.formDialog, {
            width: '500px'
        });
    }

    guardar() {
        if (this.form.invalid) return;

        const consulta = this.form.value as Consulta;
        const obs = this.editando
            ? this.consultaService.update(consulta)
            : this.consultaService.add(consulta);

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
        this.consultaService.delete(id).subscribe(() => this.recargar());
    }
}