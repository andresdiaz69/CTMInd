# View: vw_Cobertura_Dias_Repuestos

## Usa los objetos:
- [[vw_Cobertura_Costos_Ventas]]
- [[vw_Cobertura_inventarios]]

```sql
CREATE VIEW vw_Cobertura_Dias_Repuestos AS 
SELECT CodigoPresentacion, NombrePresentacion, NombreCentro, Año, MesInicial, MesFinal, CodigoConcepto, CodigoCentro,Sede
      ,VentasRepuestos=costoVentasMesActual, Inventarios=Valor, CobDiasRepuestos=((isnull(Valor,0)/isnull(costoVentasMesActual,0))*30)
	FROM(
			SELECT a.CodigoPresentacion, a.NombrePresentacion, a.Año, a.MesInicial, a.MesFinal, a.CodigoConcepto, a.CodigoCentro, a.NombreCentro
				  ,a.Sede, a.costoVentasMesActual, b.Valor
			FROM vw_Cobertura_Costos_Ventas a
			LEFT JOIN vw_Cobertura_inventarios b ON a.CodigoCentro=b.IdCentros
			WHERE b.Mes_Periodo = CASE WHEN a.MesInicial = 1 THEN 12       ELSE a.MesInicial-1 END
			  AND b.Ano_periodo = CASE WHEN a.MesInicial = 1 THEN a.año -1 ELSE a.año          END
	)a
WHERE NombreCentro NOT LIKE 'CO-%'  
AND NombreCentro   NOT LIKE 'BN-%' 
--and año=2022 
--and MesInicial=2
--and CodigoPresentacion=73
----and MesFinal=9
----and NombrePresentacion='BYD'
----and a.CodigoCentro=2
--and NombreCentro='JD-B/Quilla-Cl.110'
GROUP BY CodigoPresentacion, NombreCentro, Año, MesInicial, MesFinal, CodigoConcepto, CodigoCentro,Sede
         ,costoVentasMesActual, NombrePresentacion, Valor
```
