# View: v_nom_netsuitewwf

```sql


CREATE VIEW [dbo].[v_nom_netsuitewwf] 
AS
SELECT 
	'2021' AS ano_doc,
	'03' AS per_doc,
	'800' AS sub_tip,
	'001' AS num_doc,
	'3' AS subsidiary,
	--'2' AS currency,
	--'1' AS exchange,
	'23' AS estructurawwf,
	--'4' AS revenuetype,
	--'6' AS revenueSubType,
	--'122' AS functionalExpense,
	'243' AS account,
	'24568' AS credit,
	'0' AS debit,
	'Registro 1 de prueba' AS memo,
	'265' AS entity,
	'267' AS centroCostos,
	'122' AS empleado,
	'25' AS [grant]
UNION ALL
SELECT 
	'2021' AS ano_doc,
	'03' AS per_doc,
	'800' AS sub_tip,
	'001' AS num_doc,
	'3' AS subsidiary,
	--'2' AS currency,
	--'1' AS exchange,
	'23' AS estructurawwf,
	--'4' AS revenuetype,
	--'6' AS revenueSubType,
	--'122' AS functionalExpense,
	'243' AS account,
	'0' AS credit,
	'24568' AS credit,
	'Registro 2 de prueba' AS memo,
	'265' AS entity,
	'267' AS centroCostos,
	'122' AS empleado,
	'25' AS [grant]
	



```
