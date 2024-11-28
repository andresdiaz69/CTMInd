# View: v_nom_SAPR3Movich

```sql


CREATE VIEW [dbo].[v_nom_SAPR3Movich]
AS
	--
	SELECT 
	--CABECERA
	'2020' AS ano_doc,'02' AS per_doc,
	'800' AS sub_tip,
	'TEST001' AS num_doc,
	'2020-02-10' AS Budat,
	'2020-02-10' AS Bldat,
	'N160' AS Zterm,
	'X' AS Tmode,
	--DETALLE
	'1' AS Linea,'1' AS Bukrs, '1' AS Saknr, '1' AS Newbs, '1' AS Lifnr, '1' AS Txt50, 1 as Wrbtr,
	'1' AS Zuonr, '1' AS Kostl, '1' AS Aufnr, '1' AS Rkey2, '1' AS Blart, '2020-02-10' AS Zfbdt, '1' AS Uzawe, 
	'1' AS Mwskz, '1' AS Prctr, '1' AS Ldgrp
	--
	UNION ALL
	SELECT
	--CABECERA
	'2020' AS ano_doc,'02' AS per_doc,
	'800' AS sub_tip,
	'TEST001' AS num_doc,
	'2020-02-10' AS Budat,
	'2020-02-10' AS Bldat,
	'N160' AS Zterm,
	'X' AS Tmode,
	--DETALLE
	'2' AS Linea,'1' AS Bukrs, '1' AS Saknr, '1' AS Newbs, '1' AS Lifnr, '1' AS Txt50, 1 as Wrbtr,
	'1' AS Zuonr, '1' AS Kostl, '1' AS Aufnr, '1' AS Rkey2, '1' AS Blart, '2020-02-10' AS Zfbdt, '1' AS Uzawe, 
	'1' AS Mwskz, '1' AS Prctr, '1' AS Ldgrp
	--
	--FROM nom_inf_con

```
