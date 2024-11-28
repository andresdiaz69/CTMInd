# View: vw_EmpleadosRangosManualesMaestras

## Usa los objetos:
- [[Cargos]]
- [[ComisionesCargosEsquemasManuales]]
- [[Empleados]]
- [[EmpleadosActivos]]
- [[EmpleadosRangosManualesMaestras]]
- [[EmpleadosRetirados]]
- [[Empresas]]
- [[Profiles]]
- [[RangosManualesVersiones]]
- [[vw_ComisionesMaestrasManuales]]

```sql
CREATE view [com].[vw_EmpleadosRangosManualesMaestras]

as 
select ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY ermm.IdAsociacion)) AS INT), 0) AS Id, 
	ermm.CodigoEmpleado,      e.Apellido1,             e.Apellido2,               e.Nombres,                  ermm.IdRangoMaestra,
	cmm.NombreMaestra,        cmm.IdEsquema,           cmm.NombreEsquema,         cmm.IdComisionModelo,       cmm.NombreModelo,
	cmm.DiaCorte,             ermm.Comentarios,        isnull(es.FechaRetiro, er.Fecha_Retiro) FechaRetiro,   cmm.IdUnidadNegocio,    
	cmm.NombreUnidadNegocio,  e.Codigo_Cargo,          cargos.NombreCargo,        rmv.FechaCreacion           FechaCreacionMaestra, 
	e.CodigoEmpresa, 
	Empresas.NombreEmpresa, CONCAT(Profiles.Nombres, ' ', Profiles.Apellidos) UserModificoMaestra,            ccem.CodigoCargo CodigoCargoEsquema
	

from com.EmpleadosRangosManualesMaestras as ermm
join (select distinct s.CodigoEmpleado,  s.Ano_Periodo,          s.Mes_Periodo,       Nombres,            Apellido1,         
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
                             					and s.Mes_Periodo    = c.Mes_Periodo) e on e.CodigoEmpleado = ermm.CodigoEmpleado
join com.vw_ComisionesMaestrasManuales as cmm on cmm.IdMaestra = ermm.IdRangoMaestra
join Cargos as cargos on  cargos.CodigoCargo = e.Codigo_Cargo
join (Select a.IdRangoVersion, a.IdRangoMaestra, b.FechaCreacion, b.UserIdCreo
		from (select max(IdRangoVersion)IdRangoVersion, IdRangoMaestra
			  from com.RangosManualesVersiones
			  group by IdRangoMaestra, IdRangoMaestra) a
		join com.RangosManualesVersiones b on b.IdRangoVersion = a.IdRangoVersion) rmv on rmv.IdRangoMaestra = ermm.IdRangoMaestra
join Profiles on Profiles.UserId = rmv.UserIdCreo   
join Empresas on Empresas.CodigoEmpresa = e.CodigoEmpresa
join com.ComisionesCargosEsquemasManuales ccem on ccem.IdEsquema = cmm.IdEsquema and ccem.Estado = 'ACTIVO'
join Empleados es on es.CodigoEmpleado = ermm.CodigoEmpleado
left join (select codigoempleado,max(Fecha_retiro)Fecha_Retiro from EmpleadosRetirados group by CodigoEmpleado) er on er.CodigoEmpleado = ermm.CodigoEmpleado


```
