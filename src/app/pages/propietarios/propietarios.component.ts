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
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MaterialModule } from "src/app/material.module";
import { Propietario } from "src/app/models/propietario";
import { PropietarioService } from "src/app/services/propietario.service";

@Component({
  templateUrl: './propietarios.component.html',
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
    MatDialogModule,
    MatSelectModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class PropietarioComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'nombre', 'telefono', 'correo', 'acciones'];
    dataSource = new MatTableDataSource<Propietario>();
    
    form: FormGroup;
    editando = false;
    cargando = false;
    guardando = false;
    
    @ViewChild('formDialog') formDialog!: TemplateRef<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    private propietarioService: PropietarioService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
        this.form = this.fb.group({
            id: [0],
            nombres: ['', [Validators.required, Validators.maxLength(100)]],
            apellidos: ['', [Validators.maxLength(100)]],
            identidad: ['', [Validators.required, Validators.maxLength(20)]],
            direccion: ['', Validators.maxLength(200)],
            telefonoFijo: ['', Validators.maxLength(20)],
            telefonoCelular: ['', [Validators.required, Validators.maxLength(20)]],
            correo: ['', [Validators.required, Validators.maxLength(100), Validators.email]]
        });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.recargar();
    }

    recargar() {
        this.cargando = true;
        this.propietarioService.getAll().subscribe({
            next: res => {
                this.dataSource.data = res.data;
                this.cargando = false;
            },
            error: () => (this.cargando = false)
        });
    }

    abrirDialogo(propietario?: Propietario) {
        this.editando = !!propietario;
        this.form.reset();
        if (propietario) this.form.patchValue(propietario);

        this.dialog.open(this.formDialog, {
            width: '500px'
        });
    }

    guardar() {
        if (this.form.invalid) return;

        const propietario = this.form.value as Propietario;
        const obs = this.editando
            ? this.propietarioService.update(propietario)
            : this.propietarioService.add(propietario);

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
        this.propietarioService.delete(id).subscribe(() => this.recargar());
    }
}