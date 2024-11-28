# Stored Procedure: sp_DiasHabiles

## Usa los objetos:
- [[rhh_tbcalend]]

```sql

  -- Consulta final

CREATE procedure [dbo].[sp_DiasHabiles] 
@FechaDesde as datetime,
@FechaHasta as datetime 


--declare  @FechaDesde as datetime
--declare @FechaHasta as datetime 
--set @FechaDesde = '20230403'
--set @FechaHasta = '20230405'

as


begin
SELECT  
	SUM(CASE WHEN F.DiaSemana BETWEEN 1 AND 5 THEN F.Cant ELSE 0 END) -  
	(select count(dia_fes) from novasoft_Ct_mm.dbo.rhh_tbcalend where dia_fes >= @FechaDesde and dia_fes <= @FechaHasta 
	and dia_fes not in('20210807', '20211225', '20220101', '20221225', '20230101', '20230409','20240720'	)) AS 'Habil',
	-- 2022/11/11 JCS: CUANDO ES FESTIVO Y ADEMÁS SÁBADO O DOMINGO SE DEBE ESPECIFICAR PARA QUE EL CÁLCULO QUEDE BIEN
	-- NOTA: REVISAR SI 20230409 REALMENTE SI DEBE IR

    SUM(CASE WHEN F.DiaSemana = 6             THEN F.Cant ELSE 0 END) AS 'Sabado',

    SUM(CASE WHEN F.DiaSemana = 7             THEN F.Cant ELSE 0 END) AS 'Domingo',

       Festivo= (select count(dia_fes) from novasoft_Ct_mm.dbo.rhh_tbcalend where dia_fes >= @FechaDesde

       and dia_fes <= @FechaHasta),

	   (SUM(CASE WHEN F.DiaSemana = 6 THEN F.Cant ELSE 0 END) + SUM(CASE WHEN F.DiaSemana = 7 THEN F.Cant ELSE 0 END) + (select count(dia_fes) from novasoft_Ct_mm.dbo.rhh_tbcalend where dia_fes >= @FechaDesde

       and dia_fes <= @FechaHasta)) AS DiasInhabiles

    FROM  (

        SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, @FechaHasta)/7-DATEDIFF(DAY, -6, @FechaDesde)/7 AS Cant UNION

        SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, @FechaHasta)/7-DATEDIFF(DAY, -5, @FechaDesde)/7 AS Cant UNION

        SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, @FechaHasta)/7-DATEDIFF(DAY, -4, @FechaDesde)/7 AS Cant UNION

        SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, @FechaHasta)/7-DATEDIFF(DAY, -3, @FechaDesde)/7 AS Cant UNION

        SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, @FechaHasta)/7-DATEDIFF(DAY, -2, @FechaDesde)/7 AS Cant UNION

        SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, @FechaHasta)/7-DATEDIFF(DAY, -1, @FechaDesde)/7 AS Cant UNION

        SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, @FechaHasta)/7-DATEDIFF(DAY,  0, @FechaDesde)/7 AS Cant

    ) F
	end

```
