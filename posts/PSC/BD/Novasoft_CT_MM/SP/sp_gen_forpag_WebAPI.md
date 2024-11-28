# Stored Procedure: sp_gen_forpag_WebAPI

## Usa los objetos:
- [[gen_forpag]]

```sql

/*===================================================================================
	Author:			<Alvaro Vega>
	Create date:	<10/11/2020>
	Description:	<Creación de cliente desde WebApi de Accounts Integración con CRM>	
	AYVEGA MAYO/2022 SE AGREGAN CAMPOS REQUERIDOS PARA LA INTEGRACION CON SENIOR
===================================================================================*/
CREATE PROCEDURE [dbo].[sp_gen_forpag_WebAPI]
	@codPag		CHAR(3)='%'
AS
BEGIN
	SELECT	RTRIM(cod_pag) AS codPag,
			RTRIM(nombre) AS nombre,
			tip_pag AS tipPag,
			CASE tip_pag 
				WHEN 1 THEN 'Efectivo' 
				WHEN 2 THEN 'Cheque' 
				WHEN 3 THEN 'Tarjeta' 
				ELSE 'Otro' 
				END AS TipoPago
	FROM gen_forpag
	WHERE cod_pag LIKE RTRIM(@codPag);
END;

```
