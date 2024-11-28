# View: vw_JefesDeTallerFabricaDeColisionCT_1_1

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE VIEW [dbo].[vw_JefesDeTallerFabricaDeColisionCT_1_1] AS
select Ano_Periodo,Mes_Periodo,CodigoCentro,centro,cantidad=SUM(cantidad)
from(
		select Ano_Periodo,Mes_Periodo,vin,CodigoCentro,centro,valor,cantidad=case when valor < 0 then -1 else 1 end
		from(
				select Ano_Periodo, Mes_Periodo, VIN, CodigoCentro, Centro,valor=sum(valor)
				from (
						SELECT    distinct     Ano_Periodo, Mes_Periodo, VIN, CodigoCentro, Centro,valor=sum(valorneto)
						FROM            dbo.ComisionesSpigaTallerPorOT
						--where Ano_Periodo = 2021
						--and Mes_Periodo = 3
						GROUP BY Ano_Periodo, Mes_Periodo, VIN, CodigoCentro, Centro,DescripcionTrabajo,TipoIntCargo
						HAVING        (CodigoCentro = 28) 
						and (VIN IS NOT NULL)
						and DescripcionTrabajo not like '%deducible%'
						and TipoIntCargo <> 'I'
						and sum(valorneto) <> 0
						--and vin = 'WDD1770871J098995'
					) t group by Ano_Periodo, Mes_Periodo, VIN, CodigoCentro, Centro
		)a 
)b 
--where Ano_Periodo =2021
--and Mes_Periodo = 3
group by Ano_Periodo,Mes_Periodo,CodigoCentro,centro

```
