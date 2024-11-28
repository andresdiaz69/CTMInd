# View: v_InventarioParaSeguros_VO

## Usa los objetos:
- [[spiga_InventarioVO]]

```sql

create view [dbo].[v_InventarioParaSeguros_VO] as
select Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro,CantidadVehiculos=count(vin),
ValorInventario= sum(isnull(BaseImponibleCompra,0))+sum(isnull(GastosAumentanStock,0))-
sum(isnull(DepreciacionCompra,0))
from(
	select Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro,vin,
	BaseImponibleCompra,GastosAumentanStock,DepreciacionCompra
	from [PSCService_DB].dbo.spiga_InventarioVO
	--where Ano_Periodo = 2022
	--and Mes_Periodo = 7
)a group by Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro

```
