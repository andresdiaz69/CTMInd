# View: vw_Citas_Asistidas_Taller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[spiga_OrdenesDeTrabajoCitasSinOT]]
- [[vw_empleados_taller]]

```sql


--Citas Asistidas por Taller (Agendamiento de Citas)
CREATE VIEW [dbo].[vw_Citas_Asistidas_Taller] as

SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), s.IdEmpresas, s.IdCentros, 
				s.IdCitas, s.VIN, s.NifCifEmpleado
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasSinOT]			s

LEFT JOIN ComisionesSpigaTallerPorOT	o	ON	s.VIN = o.VIN	AND s.Ano_Periodo = o.Ano_Periodo
																AND s.Mes_Periodo = o.Mes_Periodo

LEFT JOIN vw_empleados_taller			e	ON	s.NifCifEmpleado = e.codigoempleado		AND  YEAR(s.FechaCita) = e.Ano_Periodo
																						AND MONTH(s.FechaCita) = e.mes_periodo
WHERE s.IdCitaTipos <> 2
AND o.numot IS NOT NULL
AND e.codigo_departamento IN ('TC','TM')

UNION ALL

SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), s.IdEmpresas, s.IdCentros, s.IdCitas, s.NifCifEmpleado, 
				s.VIN
FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasConOT]			s

LEFT JOIN vw_empleados_taller			e	ON	s.NifCifEmpleado = e.codigoempleado		AND  YEAR(s.FechaCita) = e.Ano_Periodo
																						AND MONTH(s.FechaCita) = e.mes_periodo
where s.IdCitaTipos <> 2
AND e.codigo_departamento IN ('TC','TM')



```
