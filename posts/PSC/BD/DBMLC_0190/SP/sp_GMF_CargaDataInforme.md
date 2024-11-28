# Stored Procedure: sp_GMF_CargaDataInforme

## Usa los objetos:
- [[GMF_11_ValoresVentasNetasTotalLineas]]
- [[GMF_12_ValoresVentasNetasTotalSedes]]
- [[GMF_12_ValoresVentasNetasTotalSedes_fab_col]]
- [[GMF_13_ValorYDistribucionPorSede]]
- [[GMF_14_Valor_GMFADistribuirPorSede]]
- [[GMF_15_PorcentajeDistribucionPorCentro]]
- [[GMF_16_ValorGMFPorCentro]]
- [[GMF_7_ValorYPorcentaje]]
- [[v_GMF_11_ValoresVentasNetasTotalLineas]]
- [[v_GMF_12_ValoresVentasNetasTotalSedes]]
- [[v_GMF_12_ValoresVentasNetasTotalSedes_fab_col]]
- [[v_GMF_13_ValorYDistribucionPorSede]]
- [[v_GMF_14_Valor_GMFADistribuirPorSede]]
- [[v_GMF_15_PorcentajeDistribucionPorCentro]]
- [[v_GMF_16_ValorGMFPorCentro]]
- [[v_GMF_7_ValorYPorcentajeDistribucionLineas]]

```sql


CREATE PROCEDURE [dbo].[sp_GMF_CargaDataInforme]
AS
BEGIN

truncate table GMF_7_ValorYPorcentaje
truncate table GMF_11_ValoresVentasNetasTotalLineas
truncate table GMF_12_ValoresVentasNetasTotalSedes
truncate table GMF_12_ValoresVentasNetasTotalSedes_fab_col
truncate table GMF_13_ValorYDistribucionPorSede
truncate table GMF_14_Valor_GMFADistribuirPorSede
truncate table GMF_15_PorcentajeDistribucionPorCentro
truncate table GMF_16_ValorGMFPorCentro

insert into GMF_7_ValorYPorcentaje
select * from v_GMF_7_ValorYPorcentajeDistribucionLineas

insert into GMF_11_ValoresVentasNetasTotalLineas
select * from v_GMF_11_ValoresVentasNetasTotalLineas

insert into GMF_12_ValoresVentasNetasTotalSedes 
select * from v_GMF_12_ValoresVentasNetasTotalSedes

insert into GMF_12_ValoresVentasNetasTotalSedes_fab_col
select * from v_GMF_12_ValoresVentasNetasTotalSedes_fab_col

insert into GMF_13_ValorYDistribucionPorSede
select * from v_GMF_13_ValorYDistribucionPorSede

insert into GMF_14_Valor_GMFADistribuirPorSede
select * from v_GMF_14_Valor_GMFADistribuirPorSede

insert into GMF_15_PorcentajeDistribucionPorCentro
select * from v_GMF_15_PorcentajeDistribucionPorCentro

insert into GMF_16_ValorGMFPorCentro
select * from v_GMF_16_ValorGMFPorCentro

select 1

END

```
