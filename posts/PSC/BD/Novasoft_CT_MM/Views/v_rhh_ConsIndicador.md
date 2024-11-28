# View: v_rhh_ConsIndicador

```sql


CREATE VIEW [dbo].[v_rhh_ConsIndicador]
AS
SELECT '%' AS Campo,'Todos' AS Descripcion
UNION ALL
SELECT '0' AS Campo,'Ninguno' AS Descripcion
UNION ALL
SELECT RTRIM(CONVERT(CHAR(10),B.NAME))AS Campo,RTRIM(CONVERT(CHAR(50),P.VALUE))AS Descripcion
	FROM SYS.OBJECTS A 
	INNER JOIN SYS.COLUMNS B ON A.object_ID = B.object_ID
	INNER JOIN sys.extended_properties P ON A.Object_id = P.major_id AND B.Column_id =P.minor_id
	WHERE A.NAME ='RHH_DEFCONCEP'AND B.NAME LIKE 'ind_%' AND B.NAME NOT IN (

'ind_nded',
'ind_bon',
'ind_prn',
'ind_prv',
'ind_ppa',
'ind_tes',
'ind_terc',
'Ind_pre',
'ind_proy')



```
