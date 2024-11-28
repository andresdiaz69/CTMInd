# View: vw_ComisionesManualesEmpleadosActivos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [com].[vw_ComisionesManualesEmpleadosActivos]
as
select distinct s.CodigoEmpleado,  s.Ano_Periodo,          s.Mes_Periodo,       Nombres,            Apellido1,         
       Apellido2,    CodigoMarca,  Marca,                  Codigo_Cargo,        Nombre_Cargo,       Unidad_Negocio,     
	   Nombre_Unidad_Negocio,	   codigo_departamento,    Email_Corporativo,   codigo_seccion,     nombre_seccion,   
	   Codigo_Cargo_Generico, 	   Nombre_Cargo_generico,  CodigoEmpresa,       Empresa,            codigo_centro
  from (select a.CodigoEmpleado,   a.Ano_Periodo,  MAX(Mes_Periodo) Mes_Periodo
          from (select distinct max (Ano_Periodo) ano_periodo, CodigoEmpleado
                  from EmpleadosActivos                        
                 group by CodigoEmpleado) a 
         inner join EmpleadosActivos b  on a.codigoempleado = b.codigoempleado
                                       and a.ano_periodo    = b.ano_periodo
         where b.Estado = 'Activo' 
         group by a.CodigoEmpleado,  a.Ano_Periodo) s
inner join EmpleadosActivos c  on s.codigoempleado = c.codigoempleado
                              and s.ano_periodo    = c.ano_periodo
                              and s.Mes_Periodo    = c.Mes_Periodo 


```
