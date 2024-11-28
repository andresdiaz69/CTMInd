# View: vw_Presupuestos_Nomina_Parametrizados

## Usa los objetos:
- [[Presupuestos_Nomina]]
- [[Presupuestos_Nomina_Conceptos]]

```sql



CREATE VIEW [dbo].[vw_Presupuestos_Nomina_Parametrizados] AS

-- =============================================
-- Control de Cambios
-- 2024|10|31 - Jhon Hernandez
-- Creado para listar el presupuesto de la nómina por líneas y jerarquías editables, 
--Mostrando los valores de Nómina 
-- Modulo - Presupuestos
-- =============================================

WITH PivotedData AS (
    SELECT 

	 Idcuenta,cuenta,idclase,codigoLinea,Ano_periodo,codigocentro,
	  [1] AS Enero,						[2] AS Febrero,						[3] AS Marzo,
		[4] AS Abril,		        [5] AS Mayo,				[6] AS Junio,						[7] AS Julio,
		[8] AS Agosto,[9] AS Septiembre,	        [10] AS Octubre,			
		[11] AS Noviembre,					[12] AS Diciembre
    FROM 
    (
        SELECT 
           valor.IdJerarquia as Idcuenta, c.NombreConcepto as cuenta,
		   valor.IdClase,Valor.codigoLinea as codigoLinea,Valor.Ano_periodo,Valor.codigocentro,
		   Valor.Mes_periodo as MesPeriodo,valor.Valor
	from Presupuestos_Nomina as Valor inner join
		 Presupuestos_Nomina_Conceptos as c on valor.IdJerarquia = c.Id
    ) AS SourceTable
    PIVOT
    (
        SUM(Valor) 
        FOR MesPeriodo IN ([0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
    ) AS PivotTable
)

SELECT
    P.Idcuenta,			P.cuenta,P.IdClase,codigoLinea,Ano_periodo,codigocentro,
	P.Enero,	P.Febrero,			    P.Marzo,				P.Abril,
	P.Mayo,								P.Junio,
	P.Julio,			    P.Agosto,				P.Septiembre,						P.Octubre,							P.Noviembre,
	P.Diciembre    
		
FROM PivotedData P

```
