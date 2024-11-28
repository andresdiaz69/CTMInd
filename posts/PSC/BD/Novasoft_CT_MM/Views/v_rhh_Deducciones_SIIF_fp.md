# View: v_rhh_Deducciones_SIIF_fp

## Usa los objetos:
- [[gen_terceros]]
- [[gen_tipide]]
- [[rhh_Deducciones_SIIF_fp]]

```sql


CREATE VIEW v_rhh_Deducciones_SIIF_fp
AS

    SELECT ROW_NUMBER() OVER(ORDER BY convert(int,NIT)) AS Consec, 

				CASE
					WHEN LEN(RTRIM(D.RubroNP)) = 7  
						THEN LEFT(D.RubroNP,1)+'-'+SUBSTRING(D.RubroNP,2,2)+'-'+SUBSTRING(D.RubroNP,4,2)+'-'+SUBSTRING(D.RubroNP,6,LEN(RTRIM(D.RubroNP)))
					WHEN LEN(RTRIM(D.RubroNP)) = 9  
						THEN LEFT(D.RubroNP,1)+'-'+SUBSTRING(D.RubroNP,2,2)+'-'+SUBSTRING(D.RubroNP,4,2)+'-'+SUBSTRING(D.RubroNP,6,2)+'-'+SUBSTRING(D.RubroNP,8,LEN(RTRIM(D.RubroNP)))
					WHEN LEN(RTRIM(D.RubroNP)) = 11 
						THEN LEFT(D.RubroNP,1)+'-'+SUBSTRING(D.RubroNP,2,2)+'-'+SUBSTRING(D.RubroNP,4,2)+'-'+SUBSTRING(D.RubroNP,6,2)+'-'+SUBSTRING(D.RubroNP,8,2)+'-'+SUBSTRING(D.RubroNP,10,LEN(RTRIM(D.RubroNP)))
					ELSE LEFT(D.RubroNP,1)+'-'+SUBSTRING(D.RubroNP,2,2)+'-'+SUBSTRING(D.RubroNP,4,2)+'-'+SUBSTRING(D.RubroNP,6,2)+'-'+SUBSTRING(D.RubroNP,8,2)+'-'+SUBSTRING(D.RubroNP,10,2)+'-'+SUBSTRING(D.RubroNP,12,LEN(RTRIM(D.RubroNP)))
				END AS Rubro, 
		   ID.cod_spv AS Tid,
		   D.NIT,
		   '' AS Tcta, /*tipo cuenta, va vacio*/
		   '' AS Ncta, /*Número cta del tercero, va vacio*/
		   '' AS Base, /*Base gravable, va vacio*/
		   '' AS Tarifa, /*Tarifa que aplica al descuento, va vacio*/
		   SUM(D.val_liq) AS ValDed, /*Valor deducción*/
		   D.FecCte,
		   '800' AS SubTipo
    FROM rhh_Deducciones_SIIF_fp D
	INNER JOIN gen_terceros T ON D.NIT = T.ter_nit
	INNER JOIN gen_tipide ID ON T.tip_ide = ID.cod_tip
	GROUP BY D.RubroNP, ID.cod_spv, D.NIT, D.FecCte;
```
