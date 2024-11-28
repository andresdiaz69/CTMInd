# View: vw_Presupuestos_PyG_USC

## Usa los objetos:
- [[Presupuestos_Clases]]
- [[Presupuestos_Definitivos]]
- [[Presupuestos_Jerarquias_USC]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql



CREATE VIEW [dbo].[vw_Presupuestos_PyG_USC]
AS
WITH PivotedData AS (
    SELECT 
        IdJerarquia,
        Nivel1,
        Nivel2,
        Nivel3,
        Nivel4,
        Nivel5,
        Nivel6,
        CodigoConcepto,
        NombreConcepto,
		IdClase,
		Clase,
        Editable,
		UnidadDeMedidaCalculo,
		IdJerarquiaDependencia,
        Ano_Periodo,
        NombreCentro,
        CodigoCentro,
        CodigoLinea,
		ColorFondo,
		ColorLetra,
		Negrilla,
		DescripcionFormula,
        [1] AS Enero,
        [2] AS Febrero,
        [3] AS Marzo,
        [4] AS Abril,
        [5] AS Mayo,
        [6] AS Junio,
        [7] AS Julio,
        [8] AS Agosto,
        [9] AS Septiembre,
        [10] AS Octubre,
        [11] AS Noviembre,
        [12] AS Diciembre, 
		Porcentaje
    FROM 
    (
        SELECT DISTINCT
            dbo.Presupuestos_Jerarquias_USC.IdJerarquia,
            dbo.Presupuestos_Jerarquias_USC.Nivel1,
            dbo.Presupuestos_Jerarquias_USC.Nivel2,
            dbo.Presupuestos_Jerarquias_USC.Nivel3,
            dbo.Presupuestos_Jerarquias_USC.Nivel4,
            dbo.Presupuestos_Jerarquias_USC.Nivel5,
            dbo.Presupuestos_Jerarquias_USC.Nivel6,
            dbo.Presupuestos_Jerarquias_USC.CodigoConcepto,
            dbo.Presupuestos_Jerarquias_USC.NombreConcepto,
            dbo.Presupuestos_Jerarquias_USC.Editable,
			dbo.Presupuestos_Jerarquias_USC.UnidadDeMedidaCalculo,
			dbo.Presupuestos_Jerarquias_USC.IdJerarquiaDependencia,
            dbo.Presupuestos_Definitivos.Ano_Periodo,
            dbo.Presupuestos_Definitivos.Mes_Periodo,
			dbo.Presupuestos_Jerarquias_USC.ColorFondo,
			dbo.Presupuestos_Jerarquias_USC.ColorLetra,
			dbo.Presupuestos_Jerarquias_USC.Negrilla,
            vw_Presupuestos_CentrosPorLinea.NombreCentro,
            dbo.Presupuestos_Definitivos.CodigoCentro,
            dbo.Presupuestos_Definitivos.CodigoLinea,
            dbo.Presupuestos_Definitivos.Valor,
			dbo.Presupuestos_Definitivos.IdClase,
			dbo.Presupuestos_Definitivos.Porcentaje,
			dbo.Presupuestos_Clases.Clase,
			dbo.Presupuestos_Jerarquias_USC.DescripcionFormula
        FROM dbo.Presupuestos_Definitivos 
        INNER JOIN dbo.Presupuestos_Jerarquias_USC 
            ON dbo.Presupuestos_Definitivos.IdJerarquia = dbo.Presupuestos_Jerarquias_USC.IdJerarquia
        INNER JOIN vw_Presupuestos_CentrosPorLinea 
            ON dbo.Presupuestos_Definitivos.CodigoCentro = vw_Presupuestos_CentrosPorLinea.codCentro
		INNER JOIN dbo.Presupuestos_Clases
		    ON Presupuestos_Clases.IdClase = Presupuestos_Definitivos.IdClase

			--where CodigoLinea = 418 and dbo.Presupuestos_Definitivos.IdJerarquia = 111 and dbo.Presupuestos_Definitivos.IdClase=1
    ) AS SourceTable
    PIVOT
    (
        SUM(Valor) 
        FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
    ) AS PivotTable
)
SELECT
    IdJerarquia,
    Nivel1,
    Nivel2,
    Nivel3,
    Nivel4,
    Nivel5,
    Nivel6,
    CodigoConcepto,
    NombreConcepto,
	IdClase,
	Clase,
    Editable,
	UnidadDeMedidaCalculo,
	IdJerarquiaDependencia,
    Ano_Periodo,
    NombreCentro,
    CodigoCentro,
    CodigoLinea,
    Enero,
    Febrero,
    Marzo,
    Abril,
    Mayo,
    Junio,
    Julio,
    Agosto,
    Septiembre,
    Octubre,
    Noviembre,
    Diciembre,
    ISNULL(Enero, 0) +
    ISNULL(Febrero, 0) +
    ISNULL(Marzo, 0) +
    ISNULL(Abril, 0) +
    ISNULL(Mayo, 0) +
    ISNULL(Junio, 0) +
    ISNULL(Julio, 0) +
    ISNULL(Agosto, 0) +
    ISNULL(Septiembre, 0) +
    ISNULL(Octubre, 0) +
    ISNULL(Noviembre, 0) +
    ISNULL(Diciembre, 0) AS [Acumulado],
	Porcentaje,
	ColorFondo,
	ColorLetra,
	Negrilla,
	DescripcionFormula 
	
FROM PivotedData;

```
