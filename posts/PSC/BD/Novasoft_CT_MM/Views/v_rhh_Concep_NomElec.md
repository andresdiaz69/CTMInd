# View: v_rhh_Concep_NomElec

## Usa los objetos:
- [[rhh_Concep_NomElec]]
- [[rhh_NomElec_propiedades]]
- [[v_rhh_concep]]

```sql

CREATE VIEW [dbo].[v_rhh_Concep_NomElec]
AS
SELECT 
DISTINCT	    dbo.rhh_Concep_NomElec.Cod_con, 
		    dbo.rhh_Concep_NomElec.mod_liq, 
		    dbo.rhh_Concep_NomElec.idatributo,
		    rhh_NomElec_propiedades.propiedaddesc,
		    rhh_nomelec_propiedades.id_dian
FROM          dbo.rhh_Concep_NomElec
INNER JOIN   dbo.v_rhh_concep ON dbo.v_rhh_concep.cod_con= dbo.rhh_Concep_NomElec.cod_con and v_rhh_concep.mod_liq = rhh_Concep_NomElec.mod_liq
INNER JOIN   dbo.rhh_NomElec_propiedades ON dbo.rhh_Concep_NomElec.idatributo = dbo.rhh_NomElec_propiedades.idpropiedad 

```
