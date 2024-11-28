# View: vw_ClubIntegralComercialAC_Calculo_Puntos_Accesorios

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Calculo_Accesorios]]
- [[vw_ClubIntegralComercialAC_Ticket_Comparativa]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Calculo_Puntos_Accesorios] AS

select isnull(row_number()over (order by CodigoEmpleado asc),-1)as orden, 
Ano_Periodo,CodigoEmpleado,Empleado,CodigoCentro,NombreCentro,CodigoMarcaGrupo,MarcaGrupo,IdRangoMaestra,IdRangoVersionMax,Trimestre_Accesorios,isnull(AccesoriosVendidos,0)AccesoriosVendidos,Puntos,Resultado_Ticket

from
(
	select c.Resultado_Ticket,c.CodigoCentro,c.NombreCentro,c.CodigoMarcaGrupo,c.MarcaGrupo,a.Ano_Periodo,a.CodigoEmpleado,a.Empleado,a.Trimestre_Accesorios,a.AccesoriosVendidos,a.IdRangoMaestra,a.IdRangoVersionMax,mf.Puntos

	from vw_ClubIntegralComercialAC_Ticket_Comparativa c

	left join vw_ClubIntegralComercialAC_Calculo_Accesorios a				on				c.CedulaVendedor = a.CodigoEmpleado and c.Trimestre = a.Trimestre_Accesorios and c.Ano_Periodo = a.Ano_Periodo

	left join vw_ClubIntegralRangosMaestrasFull mf							on				a.IdRangoVersionMax = mf.IdRangoVersion 

	where CodigoEmpleado is not null and (mf.Desde < a.AccesoriosVendidos) and (mf.Hasta >= a.AccesoriosVendidos) 
	--and c.Resultado_Ticket ='PASA'
)p

```
