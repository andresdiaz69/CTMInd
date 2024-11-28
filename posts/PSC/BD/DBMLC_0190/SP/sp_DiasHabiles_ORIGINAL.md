# Stored Procedure: sp_DiasHabiles_ORIGINAL

## Usa los objetos:
- [[rhh_tbcalend]]

```sql


  -- Consulta final

CREATE procedure [dbo].[sp_DiasHabiles] 
  @FechaDesde as datetime,
  @FechaHasta as datetime 
as
begin
SELECT  
	SUM(CASE WHEN F.DiaSemana BETWEEN 1 AND 5 THEN F.Cant ELSE 0 END) -  (select count(dia_fes) from novasoft_Ct_mm.dbo.rhh_tbcalend where dia_fes >= @FechaDesde and dia_fes <= @FechaHasta) AS 'Habil',

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
