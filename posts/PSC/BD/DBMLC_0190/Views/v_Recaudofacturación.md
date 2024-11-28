# View: v_Recaudofacturación

## Usa los objetos:
- [[spiga_RecaudoPorVendedor]]
- [[vw_Centros_Marca]]

```sql
CREATE   view [dbo].[v_Recaudofacturación] as
select año,mes,dia,idempresas,Marca,ImporteEfecto=sum(ImporteSaldado)
from(
		select  distinct Año=year(r.FechaAsientoSaldar),Mes=month(r.FechaAsientoSaldar),Dia= day(r.FechaAsientoSaldar),
		r.ImporteSaldado,r.NombreCentro,r.SeccionOrigenFactura,u.marca,r.IdEmpresas,r.NumFactura
		from [PSCService_DB].[dbo].[spiga_RecaudoPorVendedor]	r
		left join [vw_Centros_Marca]							u	on	r.NombreCentro = u.NombreCentro 
		where r.IdFacturaTipos = 'E'
		--and r.Ano_Periodo = 2020
		--and r.mes_periodo = 9
		--and day(r.FechaAsientoSaldar)=29
		--and IdEmpresas = 1
		--and r.nombreCentro like '%FR-Bta.-AV 68%'
		
) a group by año,mes,dia,idempresas,marca






```
