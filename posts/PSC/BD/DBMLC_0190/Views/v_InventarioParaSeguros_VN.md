# View: v_InventarioParaSeguros_VN

## Usa los objetos:
- [[spiga_InventarioVN]]

```sql

create view [dbo].[v_InventarioParaSeguros_VN] as
select Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro,CantidadVehiculos=count(vin),
ValorInventario= sum(isnull(BaseImponibleCompra,0))+sum(isnull(GastosAumentanStock,0))-
sum(isnull(ImporteReclamado,0))
from(
	select Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro,vin,BaseImponibleCompra,GastosAumentanStock,
	ImporteReclamado
	from [PSCService_DB].dbo.spiga_InventarioVN
	--where Ano_Periodo = 2022
	--and Mes_Periodo = 7
)a group by Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro

```
