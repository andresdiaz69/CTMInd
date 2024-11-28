# View: v_nom_sapwebserviceBYD

## Usa los objetos:
- [[nom_inf_con]]

```sql

CREATE VIEW [dbo].[v_nom_sapwebserviceBYD]
AS
	--
	SELECT 
	--CABECERA
	ano_doc, per_doc,
	RTRIM(sub_tip) AS sub_tip,
	RTRIM(num_doc) AS num_doc,
	'CO'+doc.cod_cia AS cod_cia,
	'' AS 'zSetOfBooksID',
	'00047' AS 'zAccountingDocumentTypeCode',
	'601' AS 'zBusinessTransactionTypeCode',
	'COP' AS 'zTransactionCurrencyCode',
	doc.fch_doc,
	doc.fch_doc AS 'fch_doc2',
	'010' AS 'AccountingCloseStep',
	CONVERT (CHAR, LTRIM(RTRIM(doc.des_mov)),40) AS des_mov,
	--DETALLE
	CASE WHEN doc.deb_mov > '0' THEN '1' ELSE '2' END AS 'zDebitCreditCode',
	''AS'zChartOfAccountsCode',
	doc.cod_cta,
	CASE WHEN SUBSTRING(doc.cod_cta,1, 1) in ('4','5','6','7') THEN LTRIM(RTRIM(doc.cod_cl1)) ELSE '' END AS cod_cl1,
	CASE WHEN SUM(doc.cre_mov) > '0' THEN SUM(doc.cre_mov)*-1 ELSE SUM(doc.deb_mov) END AS 'zTransactionCurrencyAmount',
	'' AS cod_cco
	FROM nom_inf_con doc
	GROUP BY ano_doc, per_doc,sub_tip,num_doc,cod_cia,fch_doc,fch_doc,des_mov,
	CASE WHEN doc.deb_mov > '0' THEN '1' ELSE '2' END,cod_cta,CASE WHEN SUBSTRING(doc.cod_cta,1, 1) in ('4','5','6','7') THEN LTRIM(RTRIM(doc.cod_cl1)) ELSE '' END
	--

```
