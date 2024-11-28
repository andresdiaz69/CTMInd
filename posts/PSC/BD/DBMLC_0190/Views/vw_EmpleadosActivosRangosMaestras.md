# View: vw_EmpleadosActivosRangosMaestras

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[EmpleadosActivos]]
- [[EmpleadosRangosMaestras]]
- [[EmpleadosRetirados]]
- [[Empresas]]
- [[Profiles]]
- [[RangosMaestras]]
- [[VehiculosMarcas]]
- [[vw_ComisionesModelosSubCriterios]]

```sql

CREATE view [dbo].[vw_EmpleadosActivosRangosMaestras]
AS

select	distinct	e.CodigoEmpleado,                  e.CodigoEmpresa,                   emp.NombreEmpresa,             c.CodigoCentro, 
					c.NombreCentro,                    e.CodigoMarca,                     e.Marca MarcaEmpleado,         e.Nombres, 
					e.Apellido1,                       e.Apellido2, 
					ISNULL(e.Apellido1, N'') + N' ' + ISNULL(e.Apellido2, N'') + N' ' + ISNULL(e.Nombres, N'') AS Empleado, 
					Cargos.CodigoCargo,                Cargos.NombreCargo,                es.FechaIngreso,               isnull(es.FechaRetiro, er.Fecha_Retiro) FechaRetiro,
					rm.IdRangoMaestra,                 rm.NombreMaestra,                  rm.CodigoMarcaGrupo,           vm.Marca MarcaGrupo,
					cmsc.IdComisionModeloSub,          cmsc.NombreModeloSub,              cmsc.IdComisionModelo,         cmsc.NombreModelo,
					cmsc.NombreModeloSubCompleto,      cmsc.IdComisionModeloSubCriterio,  cmsc.NombreModeloSubCriterio,  erm.FechaVencimiento,  
					erm.UserIdModifico,                p.Nombres + N' ' + p.Apellidos UsuarioModifico,                   erm.FechaModificacion, 
						 
					cmsc.CodigoEmpresa AS CodigoEmpresa_ModeloSub,

					CASE 
					WHEN cmsc.CodigoEmpresa IS NULL THEN '' -- NO TIENE MAESTRA
					WHEN e.CodigoEmpresa <> cmsc.CodigoEmpresa THEN 'VALIDAR' -- LA EMPRESA DEL EMPLEADO NO CONCUERDA CON LA DE LA MAESTRA
					ELSE '' -- LA EMPRESA DEL EMPLEADO CONCUERDA CON LA DE LA MAESTRA
					END AS ValidacionEmpresa

	from			EmpleadosRangosMaestras erm

						right outer join (select distinct s.CodigoEmpleado,  s.Ano_Periodo,          s.Mes_Periodo,       Nombres,            Apellido1,         
      									Apellido2,    CodigoMarca,  Marca,                  Codigo_Cargo,        Nombre_Cargo,       Unidad_Negocio,     
										Nombre_Unidad_Negocio,	   codigo_departamento,    Email_Corporativo,   codigo_seccion,     nombre_seccion,   
										Codigo_Cargo_Generico, 	   Nombre_Cargo_generico,  CodigoEmpresa,       Empresa,            codigo_centro
 									from (select a.CodigoEmpleado,   a.Ano_Periodo,  MAX(Mes_Periodo) Mes_Periodo
         									from (select distinct max (Ano_Periodo) ano_periodo, CodigoEmpleado
                 									from EmpleadosActivos                        
                									group by CodigoEmpleado) a 
        									inner join EmpleadosActivos b  on a.codigoempleado = b.codigoempleado
                                      									and a.ano_periodo    = b.ano_periodo
        									group by a.CodigoEmpleado,  a.Ano_Periodo) s
								inner join EmpleadosActivos c  on s.codigoempleado = c.codigoempleado
                              									and s.ano_periodo    = c.ano_periodo
                             									and s.Mes_Periodo    = c.Mes_Periodo )e on e.CodigoEmpleado =  erm.CodigoEmpleado
						left join Cargos  on Cargos.CodigoCargo = e.Codigo_Cargo
						left join RangosMaestras rm on rm.IdRangoMaestra = erm.IdRangoMaestra
						left join vw_ComisionesModelosSubCriterios cmsc on cmsc.IdComisionModeloSubCriterio = rm.IdComisionModeloSubCriterio
						left join VehiculosMarcas vm on vm.CodigoMarca = e.CodigoMarca
						left join Centros c on c.CodigoCentro = e.codigo_centro
						left join Empresas emp on emp.CodigoEmpresa = e.CodigoEmpresa
						left join Profiles p on p.UserId = erm.UserIdModifico
						left join Empleados es on es.CodigoEmpleado = erm.CodigoEmpleado
						left join (select codigoempleado,max(Fecha_retiro)Fecha_Retiro from EmpleadosRetirados group by CodigoEmpleado) er on er.CodigoEmpleado = erm.CodigoEmpleado


```
