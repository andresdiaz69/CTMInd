# View: v_ppe_fichatecnica

## Usa los objetos:
- [[ppe_ftarmas]]
- [[ppe_ftcomputo]]
- [[ppe_ftedificios]]
- [[ppe_ftequipos]]
- [[ppe_ftlibros]]
- [[ppe_ftmaquinas]]
- [[ppe_ftmedicos]]
- [[ppe_ftmuebles]]
- [[ppe_ftobrasarte]]
- [[ppe_ftsemovientes]]
- [[ppe_ftterrenos]]
- [[ppe_ftvehiculos]]
- [[ppe_marcas]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_fichatecnica]
AS
SELECT cod_pla,mar_arm AS cod_marca,b.nom_mar AS marca,mod_arm AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftarmas AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b WITH (NOLOCK) ON a.mar_arm=b.cod_mar
UNION ALL SELECT cod_pla,mar_com AS cod_marca,b.nom_mar AS marca,mod_com AS modelo,ser_com AS serie
FROM ppe_ftcomputo AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b ON a.mar_com=b.cod_mar
UNION ALL SELECT cod_pla,'0' AS cod_marca,'EDIFICACION' AS marca,CONVERT(VARCHAR(50),'') AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftedificios WITH (NOLOCK)
UNION ALL SELECT cod_pla,mar_eqp AS cod_marca,b.nom_mar AS marca,mod_eqp AS modelo,ser_eqp AS serie
FROM ppe_ftequipos AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b ON a.mar_eqp=b.cod_mar
UNION ALL SELECT cod_pla,'0' AS cod_marca,'LIBRO' AS marca,lit_lib AS modelo,isbn_lib AS serie
FROM ppe_ftlibros WITH (NOLOCK)
UNION ALL SELECT cod_pla,mar_maq AS cod_marca,b.nom_mar AS marca,mod_maq AS modelo,ser_maq AS serie
FROM ppe_ftmaquinas AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b WITH (NOLOCK) ON a.mar_maq=b.cod_mar
UNION ALL SELECT cod_pla,mar_med AS cod_marca,b.nom_mar AS marca,mod_med AS modelo,ser_med AS serie
FROM ppe_ftmedicos AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b WITH (NOLOCK) ON a.mar_med=b.cod_mar
UNION ALL SELECT cod_pla,mar_mue AS cod_marca,b.nom_mar AS marca,mod_mue AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftmuebles AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b ON a.mar_mue=b.cod_mar
UNION ALL SELECT cod_pla,'0' AS cod_marca,tip_obra AS marca,tec_obra AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftobrasarte WITH (NOLOCK)
UNION ALL SELECT cod_pla,'0' AS cod_marca,tip_sem AS marca,cla_sem AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftsemovientes WITH (NOLOCK)
UNION ALL SELECT cod_pla,'0' AS cod_marca,'TERRENOS' AS marca,CONVERT(VARCHAR(50),'') AS modelo,CONVERT(VARCHAR(50),'') AS serie
FROM ppe_ftterrenos WITH (NOLOCK)
UNION ALL SELECT cod_pla,mar_veh AS cod_marca,b.nom_mar AS marca,mod_veh AS modelo,num_ser AS serie
FROM ppe_ftvehiculos AS a WITH (NOLOCK) INNER JOIN ppe_marcas AS b WITH (NOLOCK) ON a.mar_veh=b.cod_mar

```
