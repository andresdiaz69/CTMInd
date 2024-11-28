# View: vw_Presupuestos_Balance_Parametrizados

## Usa los objetos:
- [[Presupuestos_Balances_Parametrizados]]
- [[Presupuestos_Clases]]
- [[Presupuestos_Jerarquias_Balances]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_Balance_Parametrizados] AS

-- =============================================
-- Control de Cambios
-- 2024|10|20 - Alexis - Creado para listar el presupuesto del balance por líneas y jerarquías editables, mostrando el desglose mensual del valor y el porcentaje asignado a cada concepto. Utiliza un PIVOT para agrupar los valores por meses.
-- Modulo - Presupuestos
-- =============================================

WITH PivotedData AS (
    SELECT 
        IdJerarquia,				Nivel1,						Nivel2,								Nivel3,								Nivel4,
        Nivel5,						Nivel6,						CodigoConcepto,						NombreConcepto,						IdClase,
		Clase,						Editable,					UnidadDeMedidaCalculo,				IdJerarquiaDependencia,				Ano_Periodo,
        NombreCentro,				CodigoCentro,				CodigoLinea,						ColorFondo,							ColorLetra,
		Negrilla,					[0] AS ValorInicial,		[1] AS Enero,						[2] AS Febrero,						[3] AS Marzo,
		[4] AS Abril,		        [5] AS Mayo,				[6] AS Junio,						[7] AS Julio,						[8] AS Agosto,
		[9] AS Septiembre,	        [10] AS Octubre,			[11] AS Noviembre,					[12] AS Diciembre
    FROM 
    (
        SELECT 
            Jerarquias.IdJerarquia,				Jerarquias.Nivel1,						Jerarquias.Nivel2,							Jerarquias.Nivel3,
			Jerarquias.Nivel4,		            Jerarquias.Nivel5,						Jerarquias.Nivel6,							Jerarquias.CodigoConcepto,
			Jerarquias.NombreConcepto,			Jerarquias.Editable,					Jerarquias.UnidadDeMedidaCalculo,			Jerarquias.IdJerarquiaDependencia,
            Valores.Ano_Periodo,	            Valores.Mes_Periodo,					Jerarquias.ColorFondo,						Jerarquias.ColorLetra,
			Jerarquias.Negrilla,	            CentrosLineas.NombreCentro,				Valores.CodigoCentro,						Valores.CodigoLinea,
            Valores.Valor,						Valores.IdClase,						Clases.Clase
        
		FROM Presupuestos_Balances_Parametrizados	AS Valores        
		INNER JOIN Presupuestos_Jerarquias_Balances AS Jerarquias	 ON Valores.IdJerarquia = Jerarquias.IdJerarquia
        INNER JOIN vw_Presupuestos_CentrosPorLinea	AS CentrosLineas ON Valores.CodigoCentro = CentrosLineas.codCentro
		INNER JOIN Presupuestos_Clases				AS Clases		 ON Clases.IdClase = Valores.IdClase
    ) AS SourceTable
    PIVOT
    (
        SUM(Valor) 
        FOR Mes_Periodo IN ([0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
    ) AS PivotTable
)

SELECT
    P.IdJerarquia,			P.Nivel1,				P.Nivel2,							P.Nivel3,							P.Nivel4,
    P.Nivel5,				P.Nivel6,				P.CodigoConcepto,					P.NombreConcepto,					P.IdClase,
	P.Clase,				P.Editable,				P.UnidadDeMedidaCalculo,			P.IdJerarquiaDependencia,			P.Ano_Periodo,
    P.NombreCentro,			P.CodigoCentro,			P.CodigoLinea,						P.ValorInicial,						P.Enero,
	P.Febrero,			    P.Marzo,				P.Abril,							P.Mayo,								P.Junio,
	P.Julio,			    P.Agosto,				P.Septiembre,						P.Octubre,							P.Noviembre,
	P.Diciembre,
    
	[Acumulado] = ISNULL(P.Enero, 0) + ISNULL(P.Febrero, 0) + ISNULL(P.Marzo, 0) + ISNULL(P.Abril, 0) + ISNULL(P.Mayo, 0) + ISNULL(P.Junio, 0) 
					+ ISNULL(P.Julio, 0) + ISNULL(P.Agosto, 0) + ISNULL(P.Septiembre, 0) + ISNULL(P.Octubre, 0) + ISNULL(P.Noviembre, 0) 
					+ ISNULL(P.Diciembre, 0),
	
	P.ColorFondo,			P.ColorLetra,						P.Negrilla
	
FROM PivotedData P

```
