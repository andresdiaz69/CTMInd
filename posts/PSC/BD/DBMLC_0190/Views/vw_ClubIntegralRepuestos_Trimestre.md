# View: vw_ClubIntegralRepuestos_Trimestre

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[Empresas]]
- [[Secciones]]
- [[vw_ClubIntegralRepuestos_Mes]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestos_Trimestre] as
select r.Ano_Spiga,r.CodigoEmpresa,e.NombreEmpresa,r.CodigoCentro,c.NombreCentro,r.CodigoSeccion,s.Seccion,r.CedulaVendedorRepuestos,(em.Nombres+' '+em.Apellido1+' '+em.Apellido2)Nombres
,(r.Julio+r.Agosto+r.Septiembre)Trimestre1
,(r.Octubre+r.Noviembre+r.Diciembre)Trimestre2
,(r.Enero+r.Febrero+r.Marzo)Trimestre3
,(r.Abril+r.Mayo+r.Junio)Trimestre4
from vw_ClubIntegralRepuestos_Mes	r
left join Empresas					e		on	r.CodigoEmpresa = e.CodigoEmpresa
left join Centros					c		on	r.CodigoCentro = c.CodigoCentro
left join Secciones					s		on	r.CodigoSeccion = s.CodigoSeccion
left join Empleados					em		on	r.CedulaVendedorRepuestos = em.CodigoEmpleado 

```
