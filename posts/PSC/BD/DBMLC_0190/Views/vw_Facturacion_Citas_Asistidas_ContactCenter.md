# View: vw_Facturacion_Citas_Asistidas_ContactCenter

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[spiga_OrdenesDeTrabajoCitasConOT]]
- [[spiga_OrdenesDeTrabajoCitasSinOT]]
- [[vw_empleados_taller]]

```sql


--Consulta Facturación de las citas Asistidas por Contact Center (Agendamiento de Citas)
CREATE VIEW [dbo].[vw_Facturacion_Citas_Asistidas_ContactCenter] as

select AñoCita,MesCita,AñoAltaCita,MesAltaCita,IdEmpresas,IdCentros,IdCitas,vin,NifCifEmpleado,ValorNeto=sum(valorneto)
from(
	SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), s.IdEmpresas, s.IdCentros, 
					s.IdCitas, s.VIN, s.NifCifEmpleado, o.ValorNeto,e.codigo_departamento
	FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasSinOT]			s

	LEFT JOIN ComisionesSpigaTallerPorOT	o	ON	s.VIN = o.VIN	AND s.Ano_Periodo = o.Ano_Periodo
																	AND s.Mes_Periodo = o.Mes_Periodo

	LEFT JOIN vw_empleados_taller			e	ON	s.NifCifEmpleado = e.codigoempleado		AND  YEAR(s.FechaCita) = e.Ano_Periodo
																							AND MONTH(s.FechaCita) = e.mes_periodo
	WHERE s.IdCitaTipos <> 2
	AND o.numot IS NOT NULL
	

	UNION ALL

	SELECT DISTINCT AñoCita=YEAR(FechaCita), MesCita=MONTH(FechaCita), AñoAltaCita=YEAR(FechaAltaCita), MesAltaCita=MONTH(FechaAltaCita), s.IdEmpresas, s.IdCentros, s.IdCitas, s.NifCifEmpleado, 
					s.VIN, ValorNeto = 0,e.codigo_departamento
	FROM [PSCService_DB].[dbo].[spiga_OrdenesDeTrabajoCitasConOT]			s

	LEFT JOIN vw_empleados_taller			e	ON	s.NifCifEmpleado = e.codigoempleado		AND  YEAR(s.FechaCita) = e.Ano_Periodo
																							AND MONTH(s.FechaCita) = e.mes_periodo
	where s.IdCitaTipos <> 2
	
) a  where (codigo_departamento NOT IN ('TC','TM') or codigo_departamento is null)
group by AñoCita,MesCita,AñoAltaCita,MesAltaCita,IdEmpresas,IdCentros,IdCitas,vin,NifCifEmpleado


```
