# View: v_Recaudofacturación

## Usa los objetos:
- [[spiga_RecaudoPorVendedor]]
- [[vw_Centros_Marca]]

```sql
CREATE  view v_Recaudofacturación as
select año,mes,dia,idempresas,Marca,ImporteEfecto=sum(ImporteEfecto)
from(
		select distinct Año=year(r.FechaAsientoSaldar),Mes=month(r.FechaAsientoSaldar),Dia= day(r.FechaAsientoSaldar),
		r.ImporteEfecto,r.NombreCentro,r.SeccionOrigenFactura,u.marca,r.IdEmpresas
		from [dbo].[spiga_RecaudoPorVendedor]			r
		left join [DBMLC_0190].dbo.[vw_Centros_Marca]	u	on	r.NombreCentro = u.NombreCentro 
		where r.Ano_Periodo = 2020
		and r.mes_periodo = 6
		and r.IdFacturaTipos = 'E'
) a group by año,mes,dia,idempresas,marca

```
