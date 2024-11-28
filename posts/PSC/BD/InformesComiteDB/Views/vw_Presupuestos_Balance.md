# View: vw_Presupuestos_Balance

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Definitivos_Balances]]
- [[Presupuestos_Jerarquias_Balances]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Balance] AS

-- =============================================
-- Control de Cambios
-- 2024|10|02 - Alexis - Creado para listar el presupuesto del balance por jerarquías y líneas, mostrando el desglose mensual del valor y el porcentaje asignado a cada concepto. Utiliza un PIVOT para agrupar los valores por meses.
-- 2024|10|17 - Alexis - Se quitan la columnas de Valor y porcentaje anterior, debido a que hora se adicionan desde visual.
-- Modulo - Presupuestos
-- =============================================

WITH PivotedData AS (
    SELECT 
        IdJerarquia,				Nivel1,						Nivel2,								Nivel3,								Nivel4,
        Nivel5,						Nivel6,						CodigoConcepto,						NombreConcepto,						IdClase,
		Clase,						Editable,					UnidadDeMedidaCalculo,				IdJerarquiaDependencia,				Ano_Periodo,
        NombreCentro,				CodigoCentro,				CodigoLinea,						ColorFondo,							ColorLetra,
		Negrilla,					[1] AS Enero,				[2] AS Febrero,						[3] AS Marzo,						[4] AS Abril,
        [5] AS Mayo,				[6] AS Junio,				[7] AS Julio,						[8] AS Agosto,						[9] AS Septiembre,
        [10] AS Octubre,			[11] AS Noviembre,			[12] AS Diciembre,					Porcentaje
    FROM 
    (
        SELECT 
            Jerarquias.IdJerarquia,				Jerarquias.Nivel1,						Jerarquias.Nivel2,							Jerarquias.Nivel3,
			Jerarquias.Nivel4,		            Jerarquias.Nivel5,						Jerarquias.Nivel6,							Jerarquias.CodigoConcepto,
			Jerarquias.NombreConcepto,			Jerarquias.Editable,					Jerarquias.UnidadDeMedidaCalculo,			Jerarquias.IdJerarquiaDependencia,
            Definitivo.Ano_Periodo,	            Definitivo.Mes_Periodo,					Jerarquias.ColorFondo,						Jerarquias.ColorLetra,
			Jerarquias.Negrilla,	            CentrosLineas.NombreCentro,				Definitivo.CodigoCentro,		            Definitivo.CodigoLinea,
            Definitivo.Valor,					Definitivo.IdClase,						Definitivo.Porcentaje,						Clases.Clase
        
		FROM Presupuestos_Definitivos_Balances		AS Definitivo        
		INNER JOIN Presupuestos_Jerarquias_Balances AS Jerarquias	 ON Definitivo.IdJerarquia = Jerarquias.IdJerarquia
        INNER JOIN vw_Presupuestos_CentrosPorLinea	AS CentrosLineas ON Definitivo.CodigoCentro = CentrosLineas.CodCentro AND Definitivo.CodigoLinea = CentrosLineas.CodUnidadNegocio
		INNER JOIN Presupuestos_Clases				AS Clases		 ON Clases.IdClase = Definitivo.IdClase
    ) AS SourceTable
    PIVOT
    (
        SUM(Valor) 
        FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
    ) AS PivotTable
)

SELECT
    P.IdJerarquia,			P.Nivel1,				P.Nivel2,							P.Nivel3,							P.Nivel4,
    P.Nivel5,				P.Nivel6,				P.CodigoConcepto,					P.NombreConcepto,					P.IdClase,
	P.Clase,				P.Editable,				P.UnidadDeMedidaCalculo,			P.IdJerarquiaDependencia,			P.Ano_Periodo,
    P.NombreCentro,			P.CodigoCentro,			P.CodigoLinea,						P.Enero,							P.Febrero,
    P.Marzo,				P.Abril,				P.Mayo,								P.Junio,							P.Julio,
    P.Agosto,				P.Septiembre,			P.Octubre,							P.Noviembre,						P.Diciembre,
    
	[Acumulado] = ISNULL(P.Enero, 0) + ISNULL(P.Febrero, 0) + ISNULL(P.Marzo, 0) + ISNULL(P.Abril, 0) + ISNULL(P.Mayo, 0) + ISNULL(P.Junio, 0) 
					+ ISNULL(P.Julio, 0) + ISNULL(P.Agosto, 0) + ISNULL(P.Septiembre, 0) + ISNULL(P.Octubre, 0) + ISNULL(P.Noviembre, 0) 
					+ ISNULL(P.Diciembre, 0),
	
	P.Porcentaje,			P.ColorFondo,			P.ColorLetra,						P.Negrilla
	
FROM PivotedData P

```
