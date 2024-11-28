# View: vw_Presupuestos_Balance_Provisiones

## Usa los objetos:
- [[Presupuestos_Balances_Provisiones]]

```sql
CREATE VIEW vw_Presupuestos_Balance_Provisiones
AS
SELECT 
    IdItemProvisiones,   IdJerarquia,   CodigoLinea,   CodigoCentro,   IdClase,   Nombre_Concepto,   Unidad_De_Medida,   Ano_Periodo,
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
    [12] AS Diciembre
FROM 
    (SELECT 
         IdItemProvisiones,   IdJerarquia,   CodigoLinea,   CodigoCentro,   IdClase,   Nombre_Concepto,   Unidad_De_Medida,  Ano_Periodo,
         Mes_Periodo,         Valor
     FROM 
         Presupuestos_Balances_Provisiones) AS SourceTable
PIVOT
(
    SUM(Valor) 
    FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
) AS PivotTable;


```
