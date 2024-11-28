# Stored Procedure: SCC_sp_Consulta_Anexo

## Usa los objetos:
- [[SCC_Anexos]]
- [[SCC_Cabeza]]

```sql
-- =============================================
-- Author:		David Andres 
-- Create date:	Octubre 2015
-- Description:	Consulta anexoSCC
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Consulta_Anexo]


   	@Nro_SCC VARCHAR(15)


	AS

	BEGIN
		SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

		SELECT  doc_anx
	    FROM	SCC_Anexos AS ANX INNER JOIN SCC_Cabeza AS CAB
		ON ANX.Nro_Formato = CAB.Nro_Formato
		WHERE   Nro_SCC = @Nro_SCC ;


    END







```
