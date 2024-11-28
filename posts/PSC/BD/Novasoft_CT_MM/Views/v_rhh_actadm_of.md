# View: v_rhh_actadm_of

## Usa los objetos:
- [[rhh_actadm_of]]
- [[rhh_tipdoc_actadm_of]]
- [[rhh_tipnov_actadm_of]]

```sql
--=========================================================================== 
-- Date: 2019-10-29 
-- Ing. Victor  Olejo  
-- Vista para  mostrar la informacion de los actos  
-- administrativos en el sector Publico  
--=========================================================================== 
CREATE VIEW [dbo].[v_rhh_actadm_of] 
AS 
  SELECT id_resol, 
         cod_emp, 
         nroresol, 
         A.tip_nov, 
         TN.descripcion AS Novedad, 
         CASE TN.relacion 
           WHEN 0 THEN 'No Aplica' 
           WHEN 1 THEN 'Cesantias' 
           WHEN 2 THEN 'Vacaciones' 
           WHEN 3 THEN 'Ausentismos' 
           WHEN 4 THEN 'Historia Laboral' 
           WHEN 5 THEN 'Viaticos' 
         END            AS Relacion, 
         fec_nov, 
         A.tip_doc, 
         TD.descripcion AS Documento, 
         nro_tipdoc, 
         cod_jefei, 
         observ, 
         usuario, 
         fch_reg 
  FROM   rhh_actadm_of A 
         INNER JOIN rhh_tipdoc_actadm_of TD 
                 ON TD.tip_doc = A.tip_doc 
         INNER JOIN rhh_tipnov_actadm_of TN 
                 ON TN.tip_nov = A.tip_nov 

```
