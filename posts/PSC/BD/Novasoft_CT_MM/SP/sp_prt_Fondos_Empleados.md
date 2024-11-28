# Stored Procedure: sp_prt_Fondos_Empleados

## Usa los objetos:
- [[fn_Rhh_FondoFch]]
- [[gen_bancos]]
- [[gen_sucbancos]]
- [[rhh_emplea]]
- [[rhh_tbfondos]]

```sql



-- =============================================
-- Author:		<Jessy Peralta>
-- Create date: <26 de Febrero 2020>
-- Description:	<Se crea consulta para que traiga todos los fondos a los cuales esta afiliado el empleado>

--Modified by:		Alexander Vargas
--Modified date:	16/03/2023
--Description:		sea agrega campo nombre sucursal banco en la consulta

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_Fondos_Empleados] 
	-- Add the parameters for the stored procedure here
	@cod_emp		varchar(12)
	--WITH ENCRYPTION
AS
BEGIN
	
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    
	SELECT met_ret, por_ret, 
			dbo.fn_Rhh_FondoFch (@cod_emp,'1',getdate(),0) fdo_pen,
			pen.nom_fdo pension,
			dbo.fn_Rhh_FondoFch (@cod_emp,'2',getdate(),0) fdo_sal,
			sal.nom_fdo salud,
			dbo.fn_Rhh_FondoFch (@cod_emp,'3',getdate(),0) fdo_ate,
			ate.nom_fdo ARL,
			dbo.fn_Rhh_FondoFch (@cod_emp,'4',getdate(),0) ccf_emp,
			ccf.nom_fdo Caja,
			dbo.fn_Rhh_FondoFch (@cod_emp,'5',getdate(),0) fdo_ces,
			ces.nom_fdo Cesantia,
			dbo.fn_Rhh_FondoFch (@cod_emp,'6',getdate(),0) fdo_APV,
			apv.nom_fdo Aporte_voluntario,
			dbo.fn_Rhh_FondoFch (@cod_emp,'7',getdate(),0) fdo_AFC,
			afc.nom_fdo AFC,
			emp.cod_ban as Cod_Banco,ban.nom_ban, cta_ban,suc.nom_ban AS nom_suc 

	FROM rhh_emplea emp
	INNER JOIN gen_bancos ban ON emp.cod_ban=ban.cod_ban 
	LEFT JOIN gen_sucbancos suc ON emp.suc_ban=suc.suc_ban AND emp.cod_ban=suc.cod_ban   
			left JOIN rhh_tbfondos sal ON dbo.fn_Rhh_FondoFch (@cod_emp,'1',getdate(),0) = sal.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos pen ON dbo.fn_Rhh_FondoFch (@cod_emp,'2',getdate(),0) = pen.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos ate ON dbo.fn_Rhh_FondoFch (@cod_emp,'3',getdate(),0) = ate.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos ccf ON dbo.fn_Rhh_FondoFch (@cod_emp,'4',getdate(),0) = ccf.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos ces ON dbo.fn_Rhh_FondoFch (@cod_emp,'5',getdate(),0) = ces.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos apv ON dbo.fn_Rhh_FondoFch (@cod_emp,'6',getdate(),0) = apv.cod_fdo COLLATE DATABASE_DEFAULT 
			left JOIN rhh_tbfondos afc ON dbo.fn_Rhh_FondoFch (@cod_emp,'7',getdate(),0) = afc.cod_fdo COLLATE DATABASE_DEFAULT 																
	WHERE emp.cod_emp=@cod_emp
			

END

```
