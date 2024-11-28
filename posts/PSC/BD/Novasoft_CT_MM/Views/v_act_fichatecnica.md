# View: v_act_fichatecnica

## Usa los objetos:
- [[act_ftarmas]]
- [[act_ftcomputo]]
- [[act_ftedificios]]
- [[act_ftequipos]]
- [[act_ftlibros]]
- [[act_ftmaquinas]]
- [[act_ftmedicos]]
- [[act_ftmuebles]]
- [[act_ftobrasarte]]
- [[act_ftsemovientes]]
- [[act_ftterrenos]]
- [[act_ftvehiculos]]
- [[act_marcas]]

```sql

CREATE VIEW [dbo].[v_act_fichatecnica]
AS
SELECT cod_pla,mar_arm AS cod_marca,b.nom_mar AS marca,mod_arm AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftarmas AS a WITH(NOLOCK)
	INNER JOIN act_marcas AS b  WITH(NOLOCK)ON a.mar_arm=b.cod_mar
UNION ALL 
SELECT cod_pla,mar_com AS cod_marca,b.nom_mar AS marca,mod_com AS modelo,ser_com AS serie
FROM act_ftcomputo AS a  WITH(NOLOCK)
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_com=b.cod_mar
UNION ALL 
SELECT cod_pla,'0' AS cod_marca,'EDIFICACION' AS marca,CONVERT(VARCHAR(50),'') AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftedificios WITH(NOLOCK)
UNION ALL 
SELECT cod_pla,mar_eqp AS cod_marca,b.nom_mar AS marca,mod_eqp AS modelo,ser_eqp AS serie
FROM act_ftequipos AS a WITH(NOLOCK)
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_eqp=b.cod_mar
UNION ALL 
SELECT cod_pla,'0' AS cod_marca,'LIBRO' AS marca,lit_lib AS modelo,isbn_lib AS serie
FROM act_ftlibros WITH(NOLOCK)
UNION ALL 
SELECT cod_pla,mar_maq AS cod_marca,b.nom_mar AS marca,mod_maq AS modelo,ser_maq AS serie
FROM act_ftmaquinas AS a WITH(NOLOCK) 
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_maq=b.cod_mar
UNION ALL 
SELECT cod_pla,mar_med AS cod_marca,b.nom_mar AS marca,mod_med AS modelo,ser_med AS serie
FROM act_ftmedicos AS a WITH(NOLOCK)
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_med=b.cod_mar
UNION ALL 
SELECT cod_pla,mar_mue AS cod_marca,b.nom_mar AS marca,mod_mue AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftmuebles AS a WITH(NOLOCK) 
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_mue=b.cod_mar
UNION ALL 
SELECT cod_pla,'0' AS cod_marca,tip_obra AS marca,tec_obra AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftobrasarte WITH(NOLOCK)
UNION ALL 
SELECT cod_pla,'0' AS cod_marca,tip_sem AS marca,cla_sem AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftsemovientes WITH(NOLOCK)
UNION ALL 
SELECT cod_pla,'0' AS cod_marca,'TERRENOS' AS marca,CONVERT(VARCHAR(50),'') AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM act_ftterrenos WITH(NOLOCK)
UNION ALL 
SELECT cod_pla,mar_veh AS cod_marca,b.nom_mar AS marca,mod_veh AS modelo,num_ser AS serie
FROM act_ftvehiculos AS a WITH(NOLOCK) 
	INNER JOIN act_marcas AS b WITH(NOLOCK) ON a.mar_veh=b.cod_mar

```
