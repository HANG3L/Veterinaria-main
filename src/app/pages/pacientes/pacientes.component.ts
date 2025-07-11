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
import { Paciente } from "src/app/models/paciente";
import { Propietario } from "src/app/models/propietario";
import { Raza } from "src/app/models/raza";
import { PacienteService } from "src/app/services/paciente.service";
import { PropietarioService } from "src/app/services/propietario.service";
import { RazaService } from "src/app/services/raza.service";

@Component({
  templateUrl: './pacientes.component.html',
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
export class PacienteComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'nombre', 'raza', 'propietario', 'edad', 'sexo', 'acciones'];
    dataSource = new MatTableDataSource<Paciente>();
    razas: Raza[] = [];
    propietarios: Propietario[] = [];
    
    form: FormGroup;
    editando = false;
    cargando = false;
    guardando = false;
    
    @ViewChild('formDialog') formDialog!: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    private pacienteService: PacienteService,
    private razaService: RazaService,
    private propietarioService: PropietarioService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
        this.form = this.fb.group({
            id: [0],
            nombre: ['', [Validators.required, Validators.maxLength(100)]],
            razaId: [null, Validators.required],
            propietarioId: [null, Validators.required],
            edad: [0],
            sexo: [''],
        });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.cargarRazas();
        this.cargarPropietarios();
        this.recargar();
    }

    cargarRazas() {
        this.razaService.getAll().subscribe(res => (this.razas = res.data));
    }

    cargarPropietarios(){
        this.propietarioService.getAll().subscribe(res => (this.propietarios = res.data));
    }

    recargar() {
        this.cargando = true;
        this.pacienteService.getAll().subscribe({
            next: res => {
                this.dataSource.data = res.data;
                this.cargando = false;
            },
            error: () => (this.cargando = false)
        });
    }

    abrirDialogo(paciente?: Paciente) {
        this.editando = !!paciente;
        this.form.reset();
        if (paciente) this.form.patchValue(paciente);

        this.dialog.open(this.formDialog, {
            width: '500px'
        });
    }

    guardar() {
        if (this.form.invalid) return;

        const paciente = this.form.value as Paciente;
        const obs = this.editando
            ? this.pacienteService.update(paciente)
            : this.pacienteService.add(paciente);

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
        this.pacienteService.delete(id).subscribe(() => this.recargar());
    }
}