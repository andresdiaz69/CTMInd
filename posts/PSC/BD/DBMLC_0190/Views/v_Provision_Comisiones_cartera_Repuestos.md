# View: v_Provision_Comisiones_cartera_Repuestos

## Usa los objetos:
- [[spiga_Cartera]]

```sql
CREATE  view [dbo].[v_Provision_Comisiones_cartera_Repuestos] as -- se debe tener en cuenta que debe ser hasta el mes anterior
select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,Valor = sum(c.TotalFactura)
from		[PSCService_DB].dbo.spiga_Cartera	c
where c.Departamento not in ('VN','VO')
and c.Departamento = 'RE'
--and c.Ano_Periodo = 2020
--and c.Mes_Periodo = 5
--and month(c.FechaFactura) < 5 
group by c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro




```
