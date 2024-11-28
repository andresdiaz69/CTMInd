# View: v_InventarioParaSeguros_Repuestos

## Usa los objetos:
- [[spiga_InventarioRepuestosResumido]]

```sql

-- Inventario de Repuestos por Centro
create view [dbo].[v_InventarioParaSeguros_Repuestos] as
select Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro,ValorPrecioMedio=sum(ValorPM)
from [PSCService_DB].dbo.spiga_InventarioRepuestosResumido
--where Ano_Periodo = 2022
--and Mes_Periodo = 7
group by Ano_Periodo,Mes_Periodo,NombreEmpresa,NombreCentro

```
