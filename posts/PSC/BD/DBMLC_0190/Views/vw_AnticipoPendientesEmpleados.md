# View: vw_AnticipoPendientesEmpleados

## Usa los objetos:
- [[spiga_Empleados]]
- [[spiga_HojasDeGastosPendientes]]
- [[v_EmpleadosActivosRetirados_Requisicion]]

```sql

CREATE VIEW [dbo].[vw_AnticipoPendientesEmpleados] AS

SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY  IdTerceros)) AS INT),0) id, IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,IdAñoFactura,IdSeries,IdNumFactura,
	FechaFactura,IdAsientos,IdAñoAsiento,Estado,IdTerceros,CodigoEmpleado,NombreTercero,Concepto,ImporteTotalFactura,ImporteBI,a.ImporteBE,a.ImporteBNS
FROM 
(	
	SELECT DISTINCT a.IdEmpresas,a.NombreEmpresa,a.IdCentros,a.NombreCentro,a.IdAñoFactura,a.IdSeries,a.IdNumFactura,a.FechaFactura,a.IdAsientos,a.IdAñoAsiento,
	  c.Estado,a.IdTerceros,c.CodigoEmpleado,a.NombreTercero,a.Concepto,a.ImporteTotalFactura,a.ImporteBI,a.ImporteBE,a.ImporteBNS
	   FROM	PSCService_DB..spiga_HojasDeGastosPendientes a

	left join	PSCService_DB..spiga_Empleados b	ON a.IdTerceros = b.IdTerceros

	left join	v_EmpleadosActivosRetirados_Requisicion c	ON b.NifCif = c.CodigoEmpleado

	--where a.IdTerceros = '20853'
)A


```
