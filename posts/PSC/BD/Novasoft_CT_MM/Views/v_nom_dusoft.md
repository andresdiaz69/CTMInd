# View: v_nom_dusoft

```sql


CREATE VIEW [dbo].[v_nom_dusoft] 
AS
SELECT 
/*Cabeza*/
	'2021' AS ano_doc,
	'06' AS per_doc,
	'800' AS sub_tip,
	'001' AS num_doc,
	'NM006' AS coddocumentoencabezado,
	9 AS numerodocumentoencabezado,
	'Prueba Descripción' AS observacionencabezado,
	'12/04/2021' AS fecharegistroencabezado,
	'COS' AS codempresa,
	3 AS tipotercero,
	4 AS estadoencabezado,
	null AS identerceroencabezado,
	null AS prefijoreferencia,
	0 AS numeroreferencia,
	null AS facturareferencia,
	2 AS validarprefreferencia,
/*Cuerpo*/
	'25050101' AS codcuentaasiento,
	'20' AS codcentroutilidadasiento,
	'01' AS codlineacostoasiento,
	'1308' AS codcentrocostoasiento,
	1000000 AS valordebitoasiento,
	0 AS valorcreditoasiento,
	'38553485' AS identerceroasiento,
	'Pago de nómina febrero 2021' AS observacionasiento,
	0 AS valorbaseasiento,
	0 AS valortasaasiento,
	null AS codconcepto

UNION ALL
SELECT 
/*Cabeza*/
	'2021' AS ano_doc,
	'06' AS per_doc,
	'800' AS sub_tip,
	'001' AS num_doc,
	'NM006' AS coddocumentoencabezado,
	9 AS numerodocumentoencabezado,
	'Prueba Descripción' AS observacionencabezado,
	'12/04/2021' AS fecharegistroencabezado,
	'COS' AS codempresa,
	3 AS tipotercero,
	4 AS estadoencabezado,
	null AS identerceroencabezado,
	null AS prefijoreferencia,
	0 AS numeroreferencia,
	null AS facturareferencia,
	2 AS validarprefreferencia,
/*Cuerpo*/
	'25050101' AS codcuentaasiento,
	'20' AS codcentroutilidadasiento,
	'01' AS codlineacostoasiento,
	'1308' AS codcentrocostoasiento,
	0 AS valordebitoasiento,
	1000000 AS valorcreditoasiento,
	'38553485' AS identerceroasiento,
	'Pago de nómina febrero 2021' AS observacionasiento,
	0 AS valorbaseasiento,
	0 AS valortasaasiento,
	null AS codconcepto

```
