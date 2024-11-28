# Stored Procedure: sp_tes_pagoscajaporc_usu

## Usa los objetos:
- [[cxc_cabdoc]]
- [[inv_cabdoc]]
- [[tes_cabdoc]]

```sql



--	PROCEDIMIENTO DESTINADO PARA PERSONALIZACIONES DE USUARIO EN GENERACION DE FORMAS DE PAGO
--	JSARMIENTO SEPTIEMBRE/2013 SRS: 2013-0933
CREATE PROCEDURE [dbo].[sp_tes_pagoscajaporc_usu]
	@num_ref	CHAR(14)=NULL
AS

DECLARE @num_orden CHAR(14)

SET NOCOUNT ON
SET ROWCOUNT 0

IF @num_ref IS NULL
BEGIN
	SELECT TOP 1 ano_doc,per_doc,sub_tip,num_doc,descrip
	FROM tes_cabdoc WITH (NOLOCK) WHERE usuario=SUSER_NAME() AND tip_doc IN ('040','410')  ORDER BY fec_grab DESC
END
ELSE
BEGIN
	
	--SELECT @num_orden=num_orden
	--FROM usr_cxc_orden_matri
	--WHERE num_refe=@num_ref
	

	SELECT TOP 1 ano_doc,per_doc,sub_tip,num_doc,det_doc AS descrip
	FROM cxc_cabdoc WITH (NOLOCK) WHERE tip_doc IN ('010','020') AND num_doc=@num_orden  ORDER BY fec_grab DESC

	IF @@ROWCOUNT=0
		SELECT TOP 1 ano_doc,per_doc,sub_tip,num_doc,obs_orc AS descrip
		FROM inv_cabdoc WITH (NOLOCK) WHERE tip_doc='010' AND num_doc=@num_orden  ORDER BY fec_grab DESC
END




```
