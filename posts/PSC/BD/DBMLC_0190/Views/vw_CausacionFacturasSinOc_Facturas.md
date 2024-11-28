# View: vw_CausacionFacturasSinOc_Facturas

## Usa los objetos:
- [[EmpleadosActivos]]
- [[spiga_UsuariosDocumentos]]

```sql
CREATE view [dbo].[vw_CausacionFacturasSinOc_Facturas]  as
select distinct PkFkempresas,	FkSeries,	NumFactura,	Ano_Factura,	CodigoTercero,	CedulaEmpleado,	Nombre ,Email_Corporativo
from [PSCService_DB]..[spiga_UsuariosDocumentos]  u
left join(select Documento,Email_Corporativo,orden = ROW_NUMBER() over(partition by Documento order by ano_periodo,mes_periodo desc)
			from EmpleadosActivos) e on e.Documento = u.CedulaEmpleado
			and orden = 1


```
