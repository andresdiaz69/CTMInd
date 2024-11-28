# Stored Procedure: sp_tes_pagoscajaporc_cancela_usu

## Usa los objetos:
- [[tes_detcuadre_caja]]

```sql



--	PROCEDIMIENTO DE USUARIO QUE REALIZA LA CANCELACION DE CREACION DE DOCUMENTO EN PROCESO DE FORMAS DE PAGO
--	JSARMIENTO SEPTIEMBRE/2013 SRS: 2013-0934
CREATE PROCEDURE [dbo].[sp_tes_pagoscajaporc_cancela_usu]
		@num_refere		CHAR(15)
AS

DECLARE @num_orden CHAR(14)

SET NOCOUNT ON
SET ROWCOUNT 0

DELETE FROM tes_detcuadre_caja WHERE num_doc=@num_refere

--SELECT @num_orden=num_orden
--FROM usr_cxc_orden_matri
--WHERE num_refe=@num_refere

--IF (SELECT COUNT(1) FROM tes_cuedoc WITH (NOLOCK) WHERE num_ref=@num_orden)=0
--BEGIN
--	UPDATE usr_cxc_orden_matri SET ind_pago=0,fec_recibo='19000101' WHERE num_refe=@num_refere
--END




```
