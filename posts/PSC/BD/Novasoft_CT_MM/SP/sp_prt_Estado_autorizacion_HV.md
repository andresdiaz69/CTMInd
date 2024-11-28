# Stored Procedure: sp_prt_Estado_autorizacion_HV

## Usa los objetos:
- [[gth_portal_hdvempleado_rechazos]]
- [[prt_auditoria]]

```sql



-- =============================================
-- Author:			Alexander Vargas
-- Creation date:	16/06/2022
-- Description:		Consulta los estados de los cambios realizados en la hoja de vida  
--					el empleado

-- Modified by:		Alexander Vargas
-- Modified date:	05/07/2022
-- Description:		se realiza una consulta entre las tablas de auditoría y de 
--					rechazos hv para agregar el detalle del cambio efectuado,
--					es decir los valores anteriores y los actuales del campo modificado

-- =============================================

CREATE PROCEDURE [dbo].[sp_prt_Estado_autorizacion_HV] 

@cod_emp	varchar(12)=null,
@seccion	varchar(30)='%',
@estado    varchar(30)='%'


--WITH ENCRYPTION
AS
BEGIN


	SELECT DISTINCT tb_autoriza.*,tb_auditoria.detalle, tb_autoriza.cod_sec AS seccion,tb_autoriza.motivo AS Observaciones,CONVERT(date, tb_autoriza.fecha) as FechaGestion 
	FROM (
			select format(fecha,'yyyyMMddHHmm') as fecha_aut, * 
			from gth_portal_hdvempleado_rechazos 
	
		  ) AS tb_autoriza
	LEFT JOIN
	(
		SELECT * FROM 
		(
			SELECT	codemp as codigo, 
					SUBSTRING(LTRIM(codemp),
					0,
					CHARINDEX(' ',LTRIM(codemp),0)-1) AS codemp, 
					CHARINDEX('cambió',descripcion,0) as inicio,
					CHARINDEX('Valor anterior',descripcion,0) as fin,
					SUBSTRING(descripcion,CHARINDEX('cambió',descripcion,0)+7,CHARINDEX('Valor anterior',descripcion,0)-CHARINDEX('cambió',descripcion,0)-9) as campo ,
					--ajuste para tener en cuenta Redes Sociales
					IIF(SUBSTRING(seccion,1,5)='Redes',SUBSTRING(seccion,1,14), SUBSTRING(seccion,0,CHARINDEX(' ',seccion,0))) as seccion, 
					detalle,
					fecha,
					descripcion 
			FROM (
					select	SUBSTRING(descripcion, CHARINDEX('empleado',descripcion,0)+9,200) as codemp,
							SUBSTRING(descripcion, CHARINDEX('En la sección',descripcion,0)+14,200) as seccion,
							SUBSTRING(descripcion, CHARINDEX('Valor anterior',descripcion,0),200) as detalle, 
							format(fecha,'yyyyMMddHHmm') as fecha,descripcion 
					FROM prt_auditoria 
					where modulo='AUTORI.HV' AND evento='M'
					) AS DATOS

		) AS tb_auditoria1 
	) AS tb_auditoria 
	ON tb_autoriza.cod_emp=tb_auditoria.codemp 
	AND REPLACE(tb_autoriza.cod_sec,' ','_')=REPLACE(tb_auditoria.seccion,' ','_')
	AND tb_autoriza.fecha_aut=tb_auditoria.fecha
	AND tb_autoriza.campo=tb_auditoria.campo 
	WHERE tb_autoriza.cod_emp=@cod_emp AND Estado LIKE @estado AND cod_sec LIKE @seccion
	ORDER BY fecha DESC
	
END

```
