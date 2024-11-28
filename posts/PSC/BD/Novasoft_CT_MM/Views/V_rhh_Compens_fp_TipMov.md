# View: V_rhh_Compens_fp_TipMov

```sql

    CREATE VIEW [dbo].[V_rhh_Compens_fp_TipMov]
    AS SELECT 1 AS tip_mov,
		    'Días reconocidos' AS des_mov
	  UNION ALL
	  SELECT 2,
		    'Días a disfrutar'
	  UNION ALL
	  SELECT 3,
		    'Días a pagar';
```
