# View: v_Provision_Comisiones_Veh_Facturados_No_Entregados

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_Cartera]]

```sql
CREATE view [dbo].[v_Provision_Comisiones_Veh_Facturados_No_Entregados] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreCentro,Valor=sum(valor)
from(
		select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,Valor = sum(v.PrecioLista),c.FechaEntregaVN,c.Factura
		from		[PSCService_DB].dbo.spiga_Cartera	c
		left join	ComisionesSpigaVN					v	on	c.factura = v.NumeroFactura
		where c.Departamento in ('VN')
		and (c.FechaEntregaVN is not null)
		--and c.Ano_Periodo = 2020
		--and c.Mes_Periodo = 5
		--and c.FechaEntregaVN <= '20200430'
		--and NombreCentro like 'VO%'
		group by c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,c.FechaEntregaVN,c.Factura

		union all

		select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,Valor = (sum(v.TotalFactura)-sum(ImporteImpuestos)),c.FechaEntregaVO,c.Factura
		from		[PSCService_DB].dbo.spiga_Cartera	c
		left join	ComisionesSpigaVO					v	on	c.factura = v.NumeroFactura
		where c.Departamento in ('VO')
		and (c.FechaEntregaVO is not null)
		--and c.Ano_Periodo = 2020
		--and c.Mes_Periodo = 5
		--and c.FechaEntregaVO <= '20200430'
		--and NombreCentro like 'VO%'
		group by c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,c.FechaEntregaVo,c.Factura
) a group by Ano_Periodo,Mes_Periodo,IdEmpresas,NombreCentro

```
