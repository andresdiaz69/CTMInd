# View: vw_ContactCenter_AgendaCitas

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql

--Consulta Entradas del Mes (Agendamiento de Citas)
CREATE VIEW [dbo].[vw_ContactCenter_AgendaCitas] AS

SELECT DISTINCT

			Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, placa, cantidad = case when ValorNeto < 0 then -1 else 1 end, 
			NumeroFacturaTaller, VIN 

FROM ComisionesSpigaTallerPorOT
--WHERE Seccion NOT LIKE '%colisi%'



```
