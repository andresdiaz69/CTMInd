# View: v_nom_epicor

```sql

CREATE VIEW [dbo].[v_nom_epicor]
AS
	--
	SELECT 
	--CABECERA
	'CAP' AS Company,
	'Nova023' AS GroupID,
	CONVERT(VARCHAR(10), GETDATE(), 121) as ApplyDate, -- Fecha texto formato yyyy-MM-dd
	'Asiento contable nómina Junio' as JrnlDescription,
	--DETALLE
	'Nota pruebas débito 1' as LineDescription,
	'72056805' as Account,
	'41090201' as CostCenter,
	'800256161' as Third,
	CONVERT(MONEY,1000) as DebitAmount,
	CONVERT(MONEY,0) as CreditAmount
	UNION 
	SELECT
	--CABECERA
	'CAP' AS Company,
	'Nova023' AS GroupID,
	CONVERT(VARCHAR(10), GETDATE(), 121) as ApplyDate, -- Fecha texto formato yyyy-MM-dd
	'Nota pruebas débito 2' as JrnlDescription,
	--DETALLE
	'Nota pruebas crédito' as LineDescription,
	'52057205' as Account,
	'2212116' as CostCenter,
	'860066942' as Third,
	CONVERT(MONEY,0) as DebitAmount,
	CONVERT(MONEY,1000) as CreditAmount

```
