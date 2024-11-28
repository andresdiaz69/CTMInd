# View: vw_Presupuestos_Inversiones_Parametrizados

## Usa los objetos:
- [[Presupuestos_Inversiones]]
- [[Presupuestos_Jerarquias_Balances]]

```sql


CREATE VIEW [dbo].[vw_Presupuestos_Inversiones_Parametrizados] AS

-- =============================================
-- Control de Cambios
-- 2024|10|24 - Jhon Hernandez
-- Creado para listar el presupuesto del balance por líneas y jerarquías editables, 
--Mostrando los valores de Inversiones 
-- Modulo - Presupuestos
-- =============================================

WITH PivotedData AS (
    SELECT 

	 Idcuenta,cuenta,idcuentainv,cuenta_inversion,UnidadDeMedidaCalculo,idclase,codigoLinea,Ano_periodo,codigocentro,
	  [1] AS Enero,						[2] AS Febrero,						[3] AS Marzo,
		[4] AS Abril,		        [5] AS Mayo,				[6] AS Junio,						[7] AS Julio,
		[8] AS Agosto,[9] AS Septiembre,	        [10] AS Octubre,			
		[11] AS Noviembre,					[12] AS Diciembre
    FROM 
    (
        SELECT 
           valor.IdJerarquiaCuenta as Idcuenta,b.NombreConcepto as cuenta,
		   valor.IdJerarquiaCuentaInversion as idcuentainv,
		   c.NombreConcepto as cuenta_inversion,b.UnidadDeMedidaCalculo,valor.IdClase,
		   Valor.codigoLinea as codigoLinea,Valor.Ano_periodo,Valor.codigocentro,
		   Valor.Mes_periodo as MesPeriodo,valor.Valor
	  from Presupuestos_Inversiones as Valor inner join
		Presupuestos_Jerarquias_Balances as b on Valor.IdJerarquiaCuenta = b.IdJerarquia
		inner join Presupuestos_Jerarquias_Balances as c on Valor.IdJerarquiaCuentaInversion = c.IdJerarquia
    ) AS SourceTable
    PIVOT
    (
        SUM(Valor) 
        FOR MesPeriodo IN ([0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
    ) AS PivotTable
)

SELECT
    P.Idcuenta,			P.cuenta,				P.idcuentainv,
    P.cuenta_inversion,				P.UnidadDeMedidaCalculo,
	P.IdClase,codigoLinea,Ano_periodo,codigocentro,						P.Enero,
	P.Febrero,			    P.Marzo,				P.Abril,							P.Mayo,								P.Junio,
	P.Julio,			    P.Agosto,				P.Septiembre,						P.Octubre,							P.Noviembre,
	P.Diciembre    
		
FROM PivotedData P

```
