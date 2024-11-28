# View: vw_GestionHumana_RequisicionesDePersonal

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Departamentos]]
- [[Empleados]]
- [[GestionHumana_CargosGenericos]]
- [[GestionHumana_CargosJunta]]
- [[GestionHumana_Empresas]]
- [[GestionHumana_RequisicionesDePersonal]]
- [[GestionHumana_TiposDeCargos]]
- [[GestionHumana_TiposDeContratos]]
- [[GestionHumana_UnidadesDeNegocio]]
- [[Secciones]]
- [[Sedes]]
- [[VehiculosMarcas]]

```sql
CREATE VIEW [dbo].[vw_GestionHumana_RequisicionesDePersonal]
AS
SELECT        dbo.GestionHumana_RequisicionesDePersonal.IdRequisicionPersonal, dbo.GestionHumana_RequisicionesDePersonal.IdTipoCargo, dbo.GestionHumana_TiposDeCargos.TipoCargo, 
                         dbo.GestionHumana_RequisicionesDePersonal.NuevoCargo, dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo, dbo.Cargos.NombreCargo, 
                         dbo.GestionHumana_RequisicionesDePersonal.CodigoEmpleado, dbo.Empleados.Nombres AS Nombres_Empleado, dbo.Empleados.Apellido1 AS Apellido1_Empleado, 
                         dbo.Empleados.Apellido2 AS Apellido2_Empleado, dbo.GestionHumana_RequisicionesDePersonal.FechaIngreso, dbo.GestionHumana_RequisicionesDePersonal.Nombres, 
                         dbo.GestionHumana_RequisicionesDePersonal.Apellido1, dbo.GestionHumana_RequisicionesDePersonal.Apellido2, dbo.GestionHumana_RequisicionesDePersonal.Cedula, 
                         dbo.GestionHumana_RequisicionesDePersonal.IdTipoContrato, dbo.GestionHumana_TiposDeContratos.TipoContrato, dbo.GestionHumana_RequisicionesDePersonal.CodigoEmpresa, 
                         dbo.GestionHumana_Empresas.NombreEmpresa, dbo.GestionHumana_RequisicionesDePersonal.CodigoCentro, dbo.Centros.NombreCentro, dbo.GestionHumana_RequisicionesDePersonal.CodigoSeccion, 
                         dbo.Secciones.Seccion, dbo.GestionHumana_RequisicionesDePersonal.CodigoDepartamento, dbo.Departamentos.NombreDepartamento, dbo.GestionHumana_RequisicionesDePersonal.CodigoMarca, 
                         dbo.VehiculosMarcas.Marca, dbo.GestionHumana_RequisicionesDePersonal.CodigoUnidadNegocio, dbo.GestionHumana_UnidadesDeNegocio.NombreUnidadNegocio, 
                         dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo_Generico, dbo.GestionHumana_CargosGenericos.Nombre_Cargo_generico, dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo_Junta, 
                         dbo.GestionHumana_CargosJunta.Nombre_Cargo_Junta, dbo.GestionHumana_RequisicionesDePersonal.CodigoSede, dbo.Sedes.NombreSede, dbo.GestionHumana_RequisicionesDePersonal.Salario, 
                         dbo.GestionHumana_RequisicionesDePersonal.Bono_Alimentacion, dbo.GestionHumana_RequisicionesDePersonal.Bono_Gasolina, dbo.GestionHumana_RequisicionesDePersonal.Auxilio_Movilizacion, 
                         dbo.GestionHumana_RequisicionesDePersonal.UserIdCreo, dbo.GestionHumana_RequisicionesDePersonal.FechaCreacion, dbo.GestionHumana_RequisicionesDePersonal.UserIdModifico, 
                         dbo.GestionHumana_RequisicionesDePersonal.FechaModificacion, dbo.GestionHumana_RequisicionesDePersonal.Comentarios
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.GestionHumana_RequisicionesDePersonal LEFT OUTER JOIN
                         dbo.GestionHumana_TiposDeCargos ON dbo.GestionHumana_RequisicionesDePersonal.IdTipoCargo = dbo.GestionHumana_TiposDeCargos.IdTipoCargo LEFT OUTER JOIN
                         dbo.GestionHumana_TiposDeContratos ON dbo.GestionHumana_RequisicionesDePersonal.IdTipoContrato = dbo.GestionHumana_TiposDeContratos.IdTipoContrato LEFT OUTER JOIN
                         dbo.Cargos ON dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo = dbo.Cargos.CodigoCargo LEFT OUTER JOIN
                         dbo.Centros ON dbo.GestionHumana_RequisicionesDePersonal.CodigoCentro = dbo.Centros.CodigoCentro LEFT OUTER JOIN
                         dbo.Departamentos ON dbo.GestionHumana_RequisicionesDePersonal.CodigoDepartamento = dbo.Departamentos.CodigoDepartamento ON 
                         dbo.Empleados.CodigoEmpleado = dbo.GestionHumana_RequisicionesDePersonal.CodigoEmpleado LEFT OUTER JOIN
                         dbo.GestionHumana_CargosGenericos ON dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo_Generico = dbo.GestionHumana_CargosGenericos.Codigo_Cargo_Generico LEFT OUTER JOIN
                         dbo.GestionHumana_CargosJunta ON dbo.GestionHumana_RequisicionesDePersonal.Codigo_Cargo_Junta = dbo.GestionHumana_CargosJunta.Codigo_Cargo_Junta LEFT OUTER JOIN
                         dbo.GestionHumana_Empresas ON dbo.GestionHumana_RequisicionesDePersonal.CodigoEmpresa = dbo.GestionHumana_Empresas.CodigoEmpresa LEFT OUTER JOIN
                         dbo.GestionHumana_UnidadesDeNegocio ON dbo.GestionHumana_RequisicionesDePersonal.CodigoUnidadNegocio = dbo.GestionHumana_UnidadesDeNegocio.CodigoUnidadNegocio LEFT OUTER JOIN
                         dbo.Secciones ON dbo.GestionHumana_RequisicionesDePersonal.CodigoSeccion = dbo.Secciones.CodigoSeccion LEFT OUTER JOIN
                         dbo.VehiculosMarcas ON dbo.GestionHumana_RequisicionesDePersonal.CodigoMarca = dbo.VehiculosMarcas.CodigoMarca LEFT OUTER JOIN
                         dbo.Sedes ON dbo.GestionHumana_RequisicionesDePersonal.CodigoSede = dbo.Sedes.CodigoSede

```
